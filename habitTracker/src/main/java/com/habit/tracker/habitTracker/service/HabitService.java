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

	@Autowired
	UserService userService;

	public List<Habit> getHabitsByID(String userID) {
		try {
			return repo.findByUserID(userID);
		} catch (Exception e) {
			return null;
		}

	}

	public Habit getHabitByUserIDAndHabitID(String userID, Long habitID) {
		return repo.findByUserIDAndHabitID(userID, habitID);
	}

	public Habit addHabit(String userID, String name, int numberOfDays) {
		if (userService.getUserByID(userID) != null) {
			Habit habit = new Habit(userID, name, numberOfDays);
			return repo.save(habit);
		}
		return null;
	}

	public Habit updateHabit(String userID, Long habitID, int thisDay, Day day) {
		Habit habit = repo.findByUserIDAndHabitID(userID, habitID);
		habit.setDay(day, thisDay);
		return repo.save(habit);
	}

	public void deleteHabitByID(Long habitID) {
		repo.deleteById(habitID);
	}

	public Habit completeDay(String userID, Long habitID, int today) {
		Habit habit = repo.findByUserIDAndHabitID(userID, habitID);
		habit.getDays()[today].setCompleted(true);
		return repo.save(habit);
	}

	public long moveNextStage(String userID, Long habitID, String timeZone) {

		ZoneId zoneId = ZoneId.of(timeZone);
		ZonedDateTime now = ZonedDateTime.now(zoneId);
		ZonedDateTime midnight = now.toLocalDate().plusDays(1).atStartOfDay(zoneId);

		long timeTillMidnight = Duration.between(now, midnight).toMillis();
		timeTillMidnight = 30000L;

		ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

		scheduler.schedule(() -> {
			try {
				Habit habit = repo.findByUserIDAndHabitID(userID, habitID);
				if (habit.getCurrDay() - 1 < 0 || habit.getDays()[habit.getCurrDay() - 1].isCompleted()) {
					habit.setCurrDay(habit.getCurrDay() + 1);
					repo.save(habit);
				}
			} finally {
				scheduler.shutdown();
			}

		}, timeTillMidnight, TimeUnit.MILLISECONDS);

		return timeTillMidnight;

	}

}
