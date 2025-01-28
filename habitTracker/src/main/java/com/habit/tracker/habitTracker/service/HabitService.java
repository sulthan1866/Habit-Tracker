package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habit.tracker.habitTracker.model.Day;
import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.repo.HabitsRepo;

import java.util.List;

@Service
public class HabitService {

	@Autowired
	private HabitsRepo repo;

	@Autowired
	private PostInteractionsService postInteractionsService;

	public List<Habit> getHabitsByID(String userID) {
		try {
			return repo.findAllHabitsWithOutDays(userID);
		} catch (Exception e) {
			return null;
		}

	}

	public Habit getHabitWithRangeDaysByHabitID(String userID, Long habitID, int today) {
		Habit habit = repo.findHabitWithRangeDaysByHabitID(userID, habitID, today);
		return habit;
	}

	public Habit addHabit(String userID, Long postID, String name, int numberOfDays) {

		Habit habit = new Habit(userID, postID, name, numberOfDays);
		return repo.saveHabit(habit);

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
		Habit habit = repo.getById(habitID);
		if (habit.getPostID() != null)
			postInteractionsService.removeHabitFromPost(habit.getPostID(), habit.getUserID());
		repo.deleteById(habitID);
	}

	public Day completeDay(Long id) {
		Day day = repo.findDayById(id);
		day.setCompleted(true);
		return repo.saveDay(day);
		// }
	}

	// public long moveNextStage(String userID, Long habitID, String timeZone) {

	// ZoneId zoneId = ZoneId.of(timeZone);
	// ZonedDateTime now = ZonedDateTime.now(zoneId);
	// ZonedDateTime midnight = now.toLocalDate().plusDays(1).atStartOfDay(zoneId);

	// long timeTillMidnight = Duration.between(now, midnight).toMillis();
	// timeTillMidnight = 30000;

	// ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

	// scheduler.schedule(() -> {
	// try {
	// Habit habit = repo.findHabitWithCurrDay(habitID);
	// if (habit.getDays().size() == 0)
	// return;
	// if (habit.getDays().get(1).isCompleted()) {
	// if (habit.getDays().get(0).getDate().toLocalDate().plusDays(0)
	// .isEqual(habit.getDays().get(1).getDate().toLocalDate())) {

	// habit.setStreak(habit.getStreak() + 1);
	// habit.setMaxStreak(Math.max(habit.getStreak(), habit.getMaxStreak()));
	// } else {
	// habit.setStreak(0);
	// }
	// habit.setCurrDay(habit.getCurrDay() + 1);
	// repo.saveHabit(habit);
	// }
	// } finally {
	// scheduler.shutdown();
	// }

	// }, timeTillMidnight, TimeUnit.MILLISECONDS);

	// return timeTillMidnight;

	// }

}
