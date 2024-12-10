package com.habit.tracker.habitTracker.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "days")
public class Day {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long habitID;
	private int today;
	private String[] tasks;
	@Column(columnDefinition = "TEXT")
	private String note;
	private Date date;
	private boolean isCompleted;

	public Day(Long habitID, Date date) {
		this.habitID = habitID;
		this.date = date;
	}
}
