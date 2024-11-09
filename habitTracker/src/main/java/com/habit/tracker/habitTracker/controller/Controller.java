package com.habit.tracker.habitTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.service.Service;

@RestController
@RequestMapping("/")
public class Controller {
	
	@Autowired
	Service s;
	
    @GetMapping("/")
    public String g(){
    	s.saveEntry();
        return s.getEntry();
    }
}
