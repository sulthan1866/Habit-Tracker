package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.repo.UserRepo;

@Service
public class LoginService {

	@Autowired
	UserRepo userRepo ;
	
	PasswordEncoder encoder = new BCryptPasswordEncoder(12);
	
	public boolean isUser(String userID, String password) {
		Users user=userRepo.findByUserID(userID);
		
		 return user!=null && encoder.matches(password,user.getPassword());
		
	}

	public boolean register(String userID, String password) {
		
		Users user=userRepo.findByUserID(userID);
		if(user!=null)return false;
		Users newUser = new Users(userID,encoder.encode(password));
		userRepo.save(newUser);
		return true;
		
	}

}
