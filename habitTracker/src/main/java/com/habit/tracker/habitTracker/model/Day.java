package com.habit.tracker.habitTracker.model;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@JsonIgnoreProperties(ignoreUnknown=true)
@AllArgsConstructor
@NoArgsConstructor
public class Day implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String[] tasks;
	private String note;
	private Date date;
	
	public Day() {}
	
	public Day(String[] tasks,String note,Date date) {
		this.tasks=tasks;
		this.note = note;
		this.date = date;
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
	
//	public String toString() {
//		return tasks.toString()+"    "+
//				note+"     "+
//				date;
//	}
	
}
