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
@CrossOrigin
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

	@GetMapping("/register/email")
	public ResponseEntity<String> getEmail(@RequestParam String token) {
		if (!tokenService.isValidToken(token))
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		String email = tokenService.getMailByToken(token);

		return new ResponseEntity<>(email, HttpStatus.OK);
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

	@PostMapping("/send-register")
	public ResponseEntity<HttpStatus> sendRegistration(@RequestBody Users user) {
		if (userService.getUserByEmail(user.getEmail()) != null) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
		if (tokenService.hasAlreadySentEmail(user.getEmail())) {
			return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
		}
		String token = tokenService.createToken(user.getEmail());
		String registrationLink = frontEndLink + "/register?token=" + token;
		eMailService.sendMail(user.getEmail(), "Complete Your Registration - Habit Tracker App",
				"To register for the Habit Tracker app, please click the link below:\n"
						+ registrationLink + " (Only valid for 30 minutes)\n\n"
						+ "If you did not request to register for our app, please disregard this email.");

		return new ResponseEntity<>(HttpStatus.ACCEPTED);

	}

	@PostMapping("/forgot-password")
	public ResponseEntity<HttpStatus> changePassword(@RequestBody Users user, @RequestParam String token) {
		if (!tokenService.isValidToken(token)) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		if (userService.getUserByEmail(user.getEmail()) == null) {
			return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
		}
		userService.setNewPassword(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/send-password")
	public ResponseEntity<HttpStatus> sendPasswordChange(@RequestBody Users user) {
		// if (tokenService.hasAlreadySentEmail(user.getEmail())) {
		// return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
		// }
		if (userService.getUserByEmail(user.getEmail()) == null) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
		String token = tokenService.createToken(user.getEmail());
		String registrationLink = frontEndLink + "/reset-password?token=" + token;
		eMailService.sendMail(user.getEmail(), "Reset Your Password - Habit Tracker App",
				"To reset your password for the Habit Tracker app, please click the link below:\n"
						+ registrationLink + " (Only valid for 30 minutes)\n\n"
						+ "If you did not request to change password in our app, please disregard this email.");

		return new ResponseEntity<>(HttpStatus.ACCEPTED);

	}

	@GetMapping("/")
	public ResponseEntity<String> wakeUp() {
		return new ResponseEntity<>("Hello world", HttpStatus.OK);
	}

}
