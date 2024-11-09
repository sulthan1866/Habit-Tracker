package com.habit.tracker.habitTracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.habit.tracker.habitTracker.model.Day;
import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.repo.HabitsRepo;
import com.habit.tracker.habitTracker.repo.UserRepo;

@org.springframework.stereotype.Service
public class Service {

	@Autowired
	UserRepo userRepo;
	
	@Autowired
	HabitsRepo habitRepo;
	int i=0;
	Users user = new Users("na","pa");
	Habit habit = new Habit(i,1,"ha",20);

	public void saveEntry() {
	userRepo.save(user);
	habit.setDays(new Day[] {new Day()});
	habitRepo.save(habit);
	i++;
	}
	
	public String getEntry() {
		List<Users> u= userRepo.findAll();
		List<Habit> h = habitRepo.findAll();
		String res="";
		for(Users uu:u) {
			res+=uu.toString();
		}
		for(Habit hh:h) {
			res+=hh.toString();
		}
		return res;
	}
}
