package com.habit.tracker.habitTracker.model;

import java.util.ArrayList;
import java.util.List;

import com.habit.tracker.habitTracker.converter.DaysConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "habit")
public class Habit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long habitID;
	@Column(unique = true)
	private Long postID;
	private String userID;
	private String name;
	private int numberOfDays;
	private int currDay;
	private int streak;
	private int maxStreak;

	@Convert(converter = DaysConverter.class)
	private List<Day> days;

	public Habit(String userID, Long postID, String name, int numberOfDays) {
		this.userID = userID;
		this.postID = postID;
		this.name = name;
		this.numberOfDays = numberOfDays;
		this.days = new ArrayList<>();
		this.currDay = 0;

	}

}
