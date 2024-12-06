package com.habit.tracker.habitTracker.model;

import com.habit.tracker.habitTracker.converter.DaysConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Habit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long habitID;
	private String userID;
	private String name;
	private int numberOfDays;
	private int currDay;
	private int streak;
	private int maxStreak;

	@Convert(converter = DaysConverter.class)
	@Column(columnDefinition = "TEXT")
	private Day[] days;

	public Habit(String userID, String name, int numberOfDays) {
		this.userID = userID;
		this.name = name;
		this.numberOfDays = numberOfDays;
		this.days = new Day[numberOfDays];
		this.currDay = 0;

	}

	public void setDay(Day day, int today) {
		this.days[today] = day;
	}
}
