package com.habit.tracker.habitTracker.model;

import java.util.Map;

import com.habit.tracker.habitTracker.converter.BadgesConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users {
	@Id
	private String userID;
	@Column(unique = true)
	private String email;
	private String password;
	@Convert(converter = BadgesConverter.class)
	@Column(columnDefinition = "TEXT")
	private Map<String, Map<String, Integer>> badges;

	public Users(String userID, String email, String password) {
		this.userID = userID;
		this.email = email;
		this.password = password;
	}

}
