package com.habit.tracker.habitTracker.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.repo.HabitsRepo;
import com.habit.tracker.habitTracker.repo.UserRepo;

@Service
public class GetService {

	@Autowired
	UserRepo userRepo;
	
	@Autowired
	HabitsRepo habitRepo;

	public Users getUserByID(String userID) {
		return userRepo.findByUserID(userID);
	}

	
	
	public List<Habit> getHabitsByID(String userID) {
		 
		return habitRepo.findByUserID(userID);
		
	}

	public Habit getHabitByUserIDAndHabitID(String userID, int habitID) {
		return habitRepo.findByUserIDAndHabitID(userID,habitID);
	}
	

}
