package com.habit.tracker.habitTracker.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.model.Day;
import com.habit.tracker.habitTracker.service.HabitService;

@RestController
@RequestMapping("/api/v1/{userID}")
@CrossOrigin
public class HabitController {

	@Autowired
	HabitService habitService;

	@GetMapping("/habits")
	public ResponseEntity<List<Habit>> getHabits(@PathVariable String userID) {
		List<Habit> habits = habitService.getHabitsByID(userID);
		if (habits == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<>(habits, HttpStatus.OK);
	}

	@GetMapping("/habits/{habitID}")
	public ResponseEntity<Habit> getHabit(@PathVariable String userID, @PathVariable int habitID) {
		Habit habit = habitService.getHabitByUserIDAndHabitID(userID, habitID);
		if (habit == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<>(habit, HttpStatus.OK);
	}

	@PostMapping("/habits")
	public ResponseEntity<Habit> addHabit(@PathVariable String userID, @RequestBody Habit newHabit) {

		Habit habit = habitService.addHabit(userID, newHabit.getName(), newHabit.getNumberOfDays());
		if (habit != null) {
			return new ResponseEntity<>(habit, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PutMapping("/habits/{habitID}")
	public ResponseEntity<Habit> updateHabit(@PathVariable String userID,@PathVariable int habitID, @RequestBody Day day) {
		Habit updatedHabit = habitService.updateHabit(userID,habitID, day);
		if (updatedHabit != null)
			return new ResponseEntity<>(updatedHabit, HttpStatus.ACCEPTED);
		else
			return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}

	@DeleteMapping("/habits/{habitID}")
	public ResponseEntity<HttpStatus> deleteHabitByID(@PathVariable int habitID) {

		try {
			habitService.deleteHabitByID(habitID);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
