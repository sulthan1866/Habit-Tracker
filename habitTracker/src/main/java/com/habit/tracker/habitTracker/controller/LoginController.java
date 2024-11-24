package com.habit.tracker.habitTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.service.LoginService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class LoginController {

	@Autowired
	LoginService loginService;

	@PostMapping("/login")
	public ResponseEntity<HttpStatus> login(@RequestBody Users user) {
		boolean isUser = loginService.isUser(user.getUserID(), user.getPassword());
		if (isUser)
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	@PostMapping("/register")
	public ResponseEntity<HttpStatus> register(@RequestBody Users user) {

		boolean isRegestered = loginService.register(user.getUserID(), user.getPassword());

		if (isRegestered)
			return new ResponseEntity<>(HttpStatus.CREATED);
		else {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@GetMapping("/")
	public ResponseEntity<String> wakeUp() {
		return new ResponseEntity<>("Hello world",HttpStatus.OK);
	}

}
