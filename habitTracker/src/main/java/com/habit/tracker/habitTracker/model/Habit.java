package com.habit.tracker.habitTracker.model;

import java.util.ArrayList;
import java.util.List;

import com.habit.tracker.habitTracker.converter.DaysConverter;

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
	private List<Day> days;

	public Habit(String userID, String name, int numberOfDays) {
		this.userID = userID;
		this.name = name;
		this.numberOfDays = numberOfDays;
		this.days = new ArrayList<>();
		this.currDay = 0;

	}

	public void setDay(Day day, int today) {
		if (this.days.size() > today && this.days.get(today).getId() >= 1) {
			this.days.set(today, day);
			this.days.get(today).setToday(today);
		} else {
			day.setId(null);
			this.days.add(day);
		}

	}
}
