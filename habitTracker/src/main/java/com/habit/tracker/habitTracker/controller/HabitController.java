package com.habit.tracker.habitTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.service.HabitService;

@RestController
@RequestMapping("/api/v1/{userID}")
@CrossOrigin
public class HabitController {
	
	@Autowired
	HabitService habitService;
	
	@PostMapping("/habits")
	public ResponseEntity<Habit> addHabit(@PathVariable String userID,@RequestBody Habit newHabit) {
		
		Habit habit = habitService.addHabit(userID,newHabit.getName(),newHabit.getNumberOfDays());
		System.out.println(newHabit.getNumberOfDays());
		if(habit!=null) {
			return new ResponseEntity<>(habit,HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

}
