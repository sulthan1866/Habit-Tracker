package com.habit.tracker.habitTracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Users {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int uid;
	private String userID;
	private String password;
	
	private int[] habits= new int[1];
	
	
	public String getUserID() {
		return userID;
	}
	public String getPassword() {
		return password;
	}
	public int getUid() {
		return uid;
	}
	public int[] getHabuts() {
		return habits;
	}
	
	public Users() {
		
	}
	public Users(String userID,String password) {
		this.userID=userID;
		this.password=password;
	}
	public String toString() {
		return "id = "+userID+
				"pass = "+password+
				"uid = "+uid+
				"len = "+habits.length;
	}
}
