package com.habit.tracker.habitTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.Users;
import com.habit.tracker.habitTracker.service.EMailService;
import com.habit.tracker.habitTracker.service.LoginService;
import com.habit.tracker.habitTracker.service.TokenService;
import com.habit.tracker.habitTracker.service.UserService;

@RestController
@CrossOrigin(origins = "${FRONT_END}")
@RequestMapping("/api/v1")
public class LoginController {

	@Autowired
	LoginService loginService;

	@Autowired
	UserService userService;

	@Autowired
	TokenService tokenService;

	@Autowired
	EMailService eMailService;

	@Value("${FRONT_END}")
	private String frontEndLink;

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Users user) {
		String userID = loginService.isUser(user.getUserID(), user.getUserID(), user.getPassword());
		if (!userID.equals(""))
			return new ResponseEntity<>(userID, HttpStatus.ACCEPTED);

		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	@PostMapping("/register")
	public ResponseEntity<HttpStatus> register(@RequestBody Users user, @RequestParam String token) {

		if (!tokenService.isValidToken(token))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		boolean isRegestered = loginService.register(user.getUserID(), user.getEmail(),
				user.getPassword());

		if (isRegestered)
			return new ResponseEntity<>(HttpStatus.CREATED);
		else {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}

	}

	@PostMapping("/forgot-password")
	public ResponseEntity<HttpStatus> changePasswordWithToken(@RequestBody Users user, @RequestParam String token) {
		if (!tokenService.isValidToken(token)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		if (userService.getUserByEmail(user.getEmail()) == null) {
			return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
		}
		userService.setNewPassword(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("{userID}/change-password")
	public ResponseEntity<HttpStatus> changePassword(@RequestBody Users user) {
		if (userService.getUserByEmail(user.getEmail()) == null) {
			return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
		}
		userService.setNewPassword(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/")
	public ResponseEntity<String> wakeUp() {
		return new ResponseEntity<>("Hello world", HttpStatus.OK);
	}

}
