package com.habit.tracker.habitTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.service.UserService;

@RestController
@RequestMapping("/api/v1/{userID}")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user-details")
    public ResponseEntity<Users> getUserDetails(@PathVariable String userID) {
        Users user = userService.getUserByID(userID);
        if (user == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/habits/{habitID}/complete")
    public ResponseEntity<Users> addBadge(@PathVariable String userID, @PathVariable Long habitID) {
        Users user = userService.addBadge(userID, habitID);
        if (user == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
