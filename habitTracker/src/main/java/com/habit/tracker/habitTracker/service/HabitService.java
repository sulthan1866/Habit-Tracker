package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.repo.HabitsRepo;

@Service
public class HabitService {

	@Autowired
	HabitsRepo repo;

	public Habit addHabit(String userID, String name, int numberOfDays) {
		Habit habit = new Habit(userID, name, numberOfDays);
		return repo.save(habit);
	}

	public void deleteHabitByID(int habitID) {
		repo.deleteById(habitID);
	}

}
