package com.covid.authService.controller;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Jwts;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.covid.authService.Exception.UserAlreadyExistsException;
import com.covid.authService.Exception.UserNotFoundException;
import com.covid.authService.Exception.ValidationException;
import com.covid.authService.domain.ResetPasswordRequest;
import com.covid.authService.domain.User;
import com.covid.authService.service.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {
	private UserService userService;
	private ResponseEntity<?> responseEntity;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@CrossOrigin("*")
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) throws UserAlreadyExistsException {
		try {
		    userService.register(user);
			responseEntity = new ResponseEntity<User>(user, HttpStatus.CREATED);

		} catch (Exception e) {

			throw new UserAlreadyExistsException();
		}
		return responseEntity;
	}

	@CrossOrigin("*")
	@GetMapping("/fetch/{username}")
	public ResponseEntity<?> fetchUserByUsername(@PathVariable String username) throws UserNotFoundException {
		Map<String, User> map = new HashMap<String, User>();
		User user = userService.fetchUserByUsername(username);
		map.put("user", user);
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	@CrossOrigin("*")
	@PutMapping("/update")
	public ResponseEntity<?> updateUser(@RequestBody User user) throws ValidationException {
		Map<String, User> map = new HashMap<String, User>();
		User userReps = userService.updateUser(user);
		map.put("user", userReps);
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	@CrossOrigin("*")
	@PutMapping("/resetPassword")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest)
			throws ValidationException {
		Map<String, String> map = new HashMap<String, String>();
		userService.resetPassword(resetPasswordRequest);
		map.put("message", "Password reset successfull");
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	@CrossOrigin("*")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) throws UserNotFoundException {
		Map<String, String> map = new HashMap<String, String>();
		String jwtToken = "";
		try {
			User user2 = userService.login(user.getUserName(), user.getPassword());
			if (user2.getUserName().equals(user.getUserName())) {
				jwtToken = getToken(user.getUserName(), user.getPassword());
				map.put("message", "login successfull");
				map.put("token", jwtToken);

			}
			responseEntity = new ResponseEntity<>(map, HttpStatus.OK);

		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		}

		return responseEntity;
	}

	public String getToken(String username, String password) throws Exception {
		if (username == null || password == null) {
			throw new ServletException("Please provide proper username and password");
		}
		String jwtToken = Jwts.builder().setSubject(username).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 30000))
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();

		return jwtToken;

	}

}
