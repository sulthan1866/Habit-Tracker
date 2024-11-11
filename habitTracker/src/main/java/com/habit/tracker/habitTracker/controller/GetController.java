package com.habit.tracker.habitTracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.service.GetService;

@RestController
@RequestMapping("/")
@CrossOrigin
public class GetController {
	
	@Autowired
	GetService getService;
	
    @GetMapping("/user-details/{userID}")
    public ResponseEntity<Users> getUserDetails(@PathVariable String userID){
       Users user = getService.getUserByID(userID);
       if(user==null)return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       else return new ResponseEntity<>(user,HttpStatus.OK);
    }
    
    @GetMapping("/habits/{userID}")
    public ResponseEntity<List<Habit>> getHabits(@PathVariable String userID){
       List<Habit> habits = getService.getHabitsByID(userID);
       if(habits==null)return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       else return new ResponseEntity<>(habits,HttpStatus.OK);
    }
    
    @GetMapping("/habits/{userID}/{habitID}")
    public ResponseEntity<Habit> getHabit(@PathVariable String userID,@PathVariable int habitID){
    	Habit habit = getService.getHabitByUserIDAndHabitID(userID,habitID);
    	if(habit==null)return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else return new ResponseEntity<>(habit,HttpStatus.OK);
    }
}
