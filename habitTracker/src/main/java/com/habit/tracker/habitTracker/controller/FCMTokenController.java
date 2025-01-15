package com.habit.tracker.habitTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.FCMToken;
import com.habit.tracker.habitTracker.service.FCMService;

@RestController
@RequestMapping("api/v1/fcmtokens")
@CrossOrigin(origins = "${FRONT_END}")
public class FCMTokenController {

    @Autowired
    FCMService service;

    @PostMapping("/{userID}")
    public ResponseEntity<FCMToken> addToken(@RequestBody FCMToken token) {
        FCMToken newToken = service.addToken(token);
        return new ResponseEntity<>(newToken, HttpStatus.OK);
    }

    @GetMapping("/{userID}")
    public ResponseEntity<FCMToken> getToken(@PathVariable String userID) {
        FCMToken token = service.getToken(userID);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<FCMToken> deleteToken(@PathVariable String userID) {

        boolean deleted = service.deleteToken(userID);
        if (deleted)
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
}
