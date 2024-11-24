package com.habit.tracker.habitTracker.controller;

import java.time.ZoneId;
import java.util.List;
import java.util.Map;

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
			return new ResponseEntity<>(HttpStatus.OK);
		return new ResponseEntity<>(habits, HttpStatus.OK);
	}

	@GetMapping("/habits/{habitID}")
	public ResponseEntity<Habit> getHabit(@PathVariable String userID, @PathVariable Long habitID) {
		Habit habit = habitService.getHabitByUserIDAndHabitID(userID, habitID);
		if (habit == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(habit, HttpStatus.OK);
	}

	@PostMapping("/habits")
	public ResponseEntity<Habit> addHabit(@PathVariable String userID, @RequestBody Habit newHabit) {

		Habit habit = habitService.addHabit(userID, newHabit.getName(), newHabit.getNumberOfDays());
		if (habit != null)
			return new ResponseEntity<>(habit, HttpStatus.CREATED);
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@PutMapping("/habits/{habitID}/{thisDay}")
	public ResponseEntity<Habit> updateHabit(@PathVariable String userID, @PathVariable Long habitID,
			@PathVariable int thisDay, @RequestBody Day day) {
		Habit updatedHabit = habitService.updateHabit(userID, habitID, thisDay, day);
		if (updatedHabit != null)
			return new ResponseEntity<>(updatedHabit, HttpStatus.ACCEPTED);
		return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}

	@PutMapping("/habits/{habitID}/next")
	public ResponseEntity<Long> moveNextStage(@PathVariable String userID, @PathVariable Long habitID,
			@RequestBody Map<String, String> timeZoneBody) {
		String timeZone = timeZoneBody.get("timeZone");
		if (!ZoneId.getAvailableZoneIds().contains(timeZone))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		long timeTillMidnight = habitService.moveNextStage(userID, habitID, timeZone);

		return new ResponseEntity<>(timeTillMidnight, HttpStatus.OK);
	}

	@PutMapping("/habits/{habitID}/{thisDay}/complete")
	public ResponseEntity<HttpStatus> completeDay(@PathVariable String userID, @PathVariable Long habitID,
			@PathVariable int thisDay) {
		Habit habit = habitService.completeDay(userID, habitID, thisDay);
		if (habit.getDays()[thisDay].isCompleted())
			return new ResponseEntity<>(HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);

	}

	@DeleteMapping("/habits/{habitID}")
	public ResponseEntity<HttpStatus> deleteHabitByID(@PathVariable Long habitID) {
		habitService.deleteHabitByID(habitID);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
