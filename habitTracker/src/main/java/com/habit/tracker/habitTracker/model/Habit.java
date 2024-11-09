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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int habitID;
	private int uid;
	private String name;
	private int numerOfDays;
	private int currDay;

	@Convert(converter=DaysConverter.class)
	@Column(columnDefinition="text")
	private Day[] days;
	
	public Habit() {}
	public Habit(int uid,String name,int numberOfDays) {
		this.uid=uid;
		this.name=name;
		this.numerOfDays=numberOfDays;
		this.days=new Day[numberOfDays];
		this.currDay=0;
		
	}
	
	public int getHabitID() {
		return this.habitID;
	}
	public void addDay(Day days) {
		this.days[this.currDay]=days;
		this.currDay+=1;
	}
//	public String toString() {
//		return "id = "+habitID+
//				"   name = "+name+
//				"   days = "+numerOfDays+
//				"   uid = "+uid+
//				"   day = "+days[0].toString();
//				
//	}
}
