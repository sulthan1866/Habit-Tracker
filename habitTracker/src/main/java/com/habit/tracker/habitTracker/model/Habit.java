package com.habit.tracker.habitTracker.model;


import com.habit.tracker.habitTracker.converter.DaysConverter;

import jakarta.persistence.Convert;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Habit {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int habitID;
	private int uid;
	private String name;
	private int numerOfDays;

	@Convert(converter=DaysConverter.class)
	private Day[] days;
	
	public Habit(int uid,int habitID,String name,int numberOfDays) {
		this.uid=uid;
		this.habitID=habitID;
		this.name=name;
		this.numerOfDays=numberOfDays;
		this.days=new Day[numberOfDays];
		
	}
	public Habit() {
		
	}
	public void setDays(Day[] days) {
		this.days=days;
	}
	public String toString() {
		return "id = "+habitID+
				"/n name ="+name+
				"\n days = "+numerOfDays+
				"/n uid = "+uid;
	}
}
