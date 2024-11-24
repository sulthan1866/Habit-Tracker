package com.habit.tracker.habitTracker.model;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Day implements Serializable {

	private static final long serialVersionUID = 1L;
	private String[] tasks;
	private String note;
	private Date date;
	private boolean isCompleted;

}
