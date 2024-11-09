package com.habit.tracker.habitTracker.service;



import org.springframework.beans.factory.annotation.Autowired;

import com.habit.tracker.habitTracker.repo.HabitsRepo;
import com.habit.tracker.habitTracker.repo.UserRepo;

@org.springframework.stereotype.Service
public class GetService {

	@Autowired
	UserRepo userRepo;
	
	@Autowired
	HabitsRepo habitRepo;
	
	
	
	
	
	
//	public void saveEntry() {
//		Users user = new Users("sulthan","1866");
//		Users user1 = new Users("jhon","1866");
//		Users user2 = new Users("smith","132236");
//		
//		userRepo.save(user);
//		userRepo.save(user1);
//		userRepo.save(user2);
//		
//		Habit usr1habit1 = new Habit(user.getUid(),"singing",30);
//		Habit usr1habit2 = new Habit(user.getUid(),"dancing",120);
//		Habit usr2habit1= new Habit(user2.getUid(),"cooking",50);
//		Habit usr2habit2= new Habit(user2.getUid(),"code",100);
//		Habit usr2habit3= new Habit(user2.getUid(),"singing",365);
//		
//		habitRepo.save(usr1habit1);
//		habitRepo.save(usr1habit2);
//		habitRepo.save(usr2habit1);
//		habitRepo.save(usr2habit2);
//		habitRepo.save(usr2habit3);
//		
//		user.addHabit(usr1habit1.getHabitID());
//		user.addHabit(usr1habit2.getHabitID());
//		user2.addHabit(usr2habit1.getHabitID());
//		user2.addHabit(usr2habit2.getHabitID());
//		user2.addHabit(usr2habit3.getHabitID());
//		
//		usr1habit1.addDay(new Day(new String[] {"sing"},"sang",new Date(0)));
//		usr1habit1.addDay(new Day(new String[] {"sing"},"sang",new Date(0)));
//		usr1habit1.addDay(new Day(new String[] {"sing"},"sang",new Date(0)));
//		usr2habit2.addDay(new Day(new String[] {"code 1 hr"},"done",new Date(0)));
//		
//		userRepo.save(user);
//		userRepo.save(user1);
//		userRepo.save(user2);
//		
//		habitRepo.save(usr1habit1);
//		habitRepo.save(usr1habit2);
//		habitRepo.save(usr2habit1);
//		habitRepo.save(usr2habit2);
//		habitRepo.save(usr2habit3);
//	}
//	
}
