package com.habit.tracker.habitTracker.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.repo.HabitsRepo;
import com.habit.tracker.habitTracker.repo.UserRepo;

@Service
public class UserService {

	@Autowired
	UserRepo userRepo;

	@Autowired
	HabitsRepo habitsRepo;

	PasswordEncoder encoder = new BCryptPasswordEncoder(12);

	public Users getUserByID(String userID) {
		return userRepo.findByUserID(userID);
	}

	public Users getUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}

	public void setNewPassword(Users user) {
		Users users = userRepo.findByEmail(user.getEmail());
		users.setPassword(encoder.encode(user.getPassword()));
		userRepo.save(users);
	}

	public void setNewEmail(Users user) {
		Users users = userRepo.findByUserID(user.getUserID());
		users.setEmail(user.getEmail());
		userRepo.save(users);
	}

	public Users addBadge(String userID, Long habitID) {
		Users user = userRepo.findByUserID(userID);
		Habit habit = habitsRepo.findByUserIDAndHabitID(userID, habitID);
		if (habit != null && habit.getCurrDay() >= habit.getNumberOfDays() - 1) {
			String badge = UserService.getBadgeName(habit);
			habit.setCurrDay(habit.getCurrDay() + 1);
			Map<String, Map<String, Integer>> badges = user.getBadges();
			Map<String, Integer> nameDayMap = badges.getOrDefault(badge, new HashMap<>());
			nameDayMap.put(habit.getName(), habit.getNumberOfDays());
			badges.put(badge, nameDayMap);
			user.setBadges(badges);
			return userRepo.save(user);
		}
		return null;
	}

	private static String getBadgeName(Habit habit) {
		int days = habit.getNumberOfDays();
		if (days >= 200)
			return "gold";
		if (days >= 100)
			return "silver";
		if (days >= 50)
			return "bronze";
		return "novice";
	}

}
