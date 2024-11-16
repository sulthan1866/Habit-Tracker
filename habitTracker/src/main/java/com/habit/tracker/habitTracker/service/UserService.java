package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.repo.UserRepo;

@Service
public class UserService {

	@Autowired
	UserRepo userRepo;

	public Users getUserByID(String userID) {
		return userRepo.findByUserID(userID);
	}
	

}
