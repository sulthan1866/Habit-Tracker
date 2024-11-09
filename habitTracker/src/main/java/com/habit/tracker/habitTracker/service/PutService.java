package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.repo.UserRepo;

@Service
public class PutService {

	@Autowired
	UserRepo userRepo ;
	
	public boolean isUser(String userID, String password) {
		Users user=userRepo.findByUserID(userID);
		
		 return user!=null && user.getPassword().equals(password);
		
	}

}
