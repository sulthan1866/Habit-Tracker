package com.habit.tracker.habitTracker.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.service.EMailService;
import com.habit.tracker.habitTracker.service.TokenService;
import com.habit.tracker.habitTracker.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/{userID}")
public class EditController {

    @Value("${FRONT_END}")
    private String frontEndLink;

    @Autowired
    UserService userService;

    @Autowired
    EMailService emailService;

    @Autowired
    TokenService tokenService;

    @PostMapping("/send-reset-email")
    public ResponseEntity<HttpStatus> sendResetEmail(@PathVariable String userID,
            @RequestBody Map<String, String> newEmail) {
        if (userService.getUserByEmail(newEmail.get("newEmail")) != null) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        if (tokenService.hasAlreadySentEmail(newEmail.get("newEmail"))) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
        String token = tokenService.createToken(newEmail.get("newEmail"));
        String link = frontEndLink + "/" + userID + "/reset-email?token=" + token;
        emailService.sendMail(newEmail.get("newEmail"), "Reset Your Mail - Habit Tracker App",
                "To reset your mail for the Habit Tracker app, please click the link below:\n"
                        + link + " (Only valid for 30 minutes)\n\n"
                        + "If you did not request to reset mail in our app, please disregard this email. And do not click the link.");

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/reset-email")
    public ResponseEntity<HttpStatus> resetEmail(@RequestBody Users user, @RequestParam String token) {

        if (!tokenService.isValidToken(token))
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        userService.setNewEmail(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}