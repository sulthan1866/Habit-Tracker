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
	HabitsRepo repo;

	public List<Habit> getHabitsByID(String userID) {

		return repo.findByUserID(userID);

	}

	public Habit getHabitByUserIDAndHabitID(String userID, int habitID) {
		return repo.findByUserIDAndHabitID(userID, habitID);
	}

	public Habit addHabit(String userID, String name, int numberOfDays) {
		Habit habit = new Habit(userID, name, numberOfDays);
		return repo.save(habit);
	}

	public void deleteHabitByID(int habitID) {
		repo.deleteById(habitID);
	}

	public Habit updateHabit(String userID,int habitID, Day day) {
		Habit habit = repo.findByUserIDAndHabitID(userID,habitID);
		habit.addDay(day);
		return repo.save(habit);
	}

}
