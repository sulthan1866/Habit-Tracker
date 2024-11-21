package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habit.tracker.habitTracker.model.Day;
import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.repo.HabitsRepo;

import java.util.List;

import java.time.*;
import java.util.concurrent.*;

@Service
public class HabitService {

	@Autowired
	HabitsRepo repo;

	public List<Habit> getHabitsByID(String userID) {
		try {
			return repo.findByUserID(userID);
		} catch (Exception e) {
			return null;
		}

	}

	public Habit getHabitByUserIDAndHabitID(String userID, int habitID) {
		return repo.findByUserIDAndHabitID(userID, habitID);
	}

	public Habit addHabit(String userID, String name, int numberOfDays) {
		Habit habit = new Habit(userID, name, numberOfDays);
		return repo.save(habit);
	}

	public Habit updateHabit(String userID, int habitID, int thisDay, Day day) {
		Habit habit = repo.findByUserIDAndHabitID(userID, habitID);
		habit.setDay(day, thisDay);
		return repo.save(habit);
	}

	public void deleteHabitByID(int habitID) {
		repo.deleteById(habitID);
	}

	public long moveNextStage(String userID, int habitID, String timeZone) {

		ZoneId zoneId = ZoneId.of(timeZone);
		ZonedDateTime now = ZonedDateTime.now(zoneId);
		ZonedDateTime midnight = now.toLocalDate().plusDays(1).atStartOfDay(zoneId);

		long timeTillMidnight = Duration.between(now, midnight).toMillis();

		ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

		scheduler.schedule(() -> {
			try {
				Habit habit = repo.findByUserIDAndHabitID(userID, habitID);
				habit.setCurrDay(habit.getCurrDay() + 1);
				repo.save(habit);
			} finally {
				scheduler.shutdown();
			}

		}, timeTillMidnight, TimeUnit.MILLISECONDS);

		return timeTillMidnight;

	}

}
