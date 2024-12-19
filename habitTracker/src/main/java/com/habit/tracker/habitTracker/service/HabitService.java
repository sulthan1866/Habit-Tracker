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
			return repo.findAllHabitsWithOutDays(userID);
		} catch (Exception e) {
			return null;
		}

	}

	public Habit getHabitWithRangeDaysByHabitID(Long habitID, int today) {
		return repo.findHabitWithRangeDaysByHabitID(habitID, today);
	}

	public Habit addHabit(String userID, String name, int numberOfDays) {
		if (userService.getUserByID(userID) != null) {
			Habit habit = new Habit(userID, name, numberOfDays);
			return repo.saveHabit(habit);
		}
		return null;
	}

	public Habit editHabitName(Long habitID, String newName) {
		Habit habit = repo.findHabitWithOutDays(habitID);
		habit.setName(newName);
		return repo.saveHabit(habit);
	}

	public Day updateDay(Day day) {
		return repo.saveDay(day);
	}

	public void deleteHabitByID(Long habitID) {
		repo.deleteById(habitID);
	}

	public Day completeDay(Long id) {
		Day day = repo.findDayById(id);
		day.setCompleted(true);
		return repo.saveDay(day);
	}

	public long moveNextStage(String userID, Long habitID, String timeZone) {

		ZoneId zoneId = ZoneId.of(timeZone);
		ZonedDateTime now = ZonedDateTime.now(zoneId);
		ZonedDateTime midnight = now.toLocalDate().plusDays(1).atStartOfDay(zoneId);

		long timeTillMidnight = Duration.between(now, midnight).toMillis();

		ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

		scheduler.schedule(() -> {
			try {
				Habit h = repo.findHabitWithOutDays(habitID);
				Habit habit = repo.findHabitWithRangeDaysByHabitID(habitID, h.getCurrDay());
				habit.setCurrDay(habit.getCurrDay() + 1);
				if (habit.getCurrDay() - 2 < 0 || habit.getDays().get(habit.getCurrDay() - 2).getDate()
						.toLocalDate()
						.plusDays(1).isEqual(habit.getDays().get(habit.getCurrDay() - 1).getDate().toLocalDate())) {
					habit.setStreak(habit.getStreak() + 1);
					int maxStreak = Math.max(habit.getMaxStreak(), habit.getStreak());
					habit.setMaxStreak(maxStreak);
				} else {
					habit.setStreak(1);
				}
				repo.saveHabit(habit);

			} finally {
				scheduler.shutdown();
			}

		}, timeTillMidnight, TimeUnit.MILLISECONDS);

		return timeTillMidnight;

	}

}
