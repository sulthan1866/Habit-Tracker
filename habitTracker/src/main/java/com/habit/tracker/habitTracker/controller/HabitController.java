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
@CrossOrigin(origins = "${FRONT_END}")
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

	@GetMapping("/habits/{habitID}/{today}")
	public ResponseEntity<Habit> getHabit(@PathVariable String userID, @PathVariable Long habitID,
			@PathVariable int today) {
		Habit habit = habitService.getHabitWithRangeDaysByHabitID(userID, habitID, today);
		if (habit == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(habit, HttpStatus.OK);
	}

	@PostMapping("/habits")
	public ResponseEntity<Habit> addHabit(@PathVariable String userID, @RequestBody Habit newHabit) {

		Habit habit = habitService.addHabit(userID, null, newHabit.getName(), newHabit.getNumberOfDays());
		if (habit != null)
			return new ResponseEntity<>(habit, HttpStatus.CREATED);
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@PutMapping("/habits/{habitID}")
	public ResponseEntity<Habit> editName(@PathVariable Long habitID,
			@RequestBody Habit newNameHabit) {
		Habit habit = habitService.editHabitName(habitID, newNameHabit.getName());
		return new ResponseEntity<>(habit, HttpStatus.ACCEPTED);

	}

	@PutMapping("/habits/{habitID}/{thisDay}")
	public ResponseEntity<Day> updateDay(@RequestBody Day day) {
		Day updatedDay = habitService.updateDay(day);
		if (updatedDay != null)
			return new ResponseEntity<>(updatedDay, HttpStatus.ACCEPTED);
		return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}

	// @PutMapping("/habits/{habitID}/next")
	// public ResponseEntity<Long> moveNextStage(@PathVariable String userID,
	// @PathVariable Long habitID,
	// @RequestBody Map<String, String> timeZoneBody) {
	// String timeZone = timeZoneBody.get("timeZone");
	// if (!ZoneId.getAvailableZoneIds().contains(timeZone))
	// return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	// long timeTillMidnight = habitService.moveNextStage(userID, habitID,
	// timeZone);

	// return new ResponseEntity<>(timeTillMidnight, HttpStatus.OK);
	// }

	@PutMapping("/habits/{habitID}/{thisDay}/complete/{id}")
	public ResponseEntity<HttpStatus> completeDay(@PathVariable Long id) {
		Day day = habitService.completeDay(id);
		if (day.isCompleted())
			return new ResponseEntity<>(HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);

	}

	@DeleteMapping("/habits/{habitID}")
	public ResponseEntity<HttpStatus> deleteHabitByID(@PathVariable Long habitID) {
		habitService.deleteHabitByID(habitID);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
