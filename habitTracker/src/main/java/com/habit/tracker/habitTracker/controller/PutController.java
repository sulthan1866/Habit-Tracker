package com.habit.tracker.habitTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.service.PutService;

@RestController
@CrossOrigin
@RequestMapping("/")
public class PutController {
	
	@Autowired
	PutService putService;
	
	@PostMapping("/login")
	public ResponseEntity<HttpStatus> login(@RequestParam String userID,@RequestParam String password) {
		boolean isUser=putService.isUser(userID,password);
		if(isUser)return new ResponseEntity<>(HttpStatus.ACCEPTED);
		else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
	}
	
}
