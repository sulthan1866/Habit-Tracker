package com.habit.tracker.habitTracker.model;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown=true)
public class Day implements Serializable{
	
	private String[] tasks;
	private String note;
	private Date date;
	
	public Day() {
		tasks=new String[] {"Ada","edaf"};
		note = "vsvw";
		date = new Date(3);
	}
	public String[] getTasks() {
		return this.tasks;
	}
	public String getNote() {
		return this.note;
	}
	public Date getDate() {
		return this.date;
	}
	
}
