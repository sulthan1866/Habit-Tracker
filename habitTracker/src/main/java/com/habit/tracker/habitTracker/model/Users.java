package com.habit.tracker.habitTracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Users {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int uid;
	@Column(unique=true)
	private String userID;
	private String password;
	private int numberOfHabits;
	private int[] habitIDs= new int[5];
	
	
	public String getUserID() {
		return userID;
	}
	public String getPassword() {
		return password;
	}
	public int getUid() {
		return uid;
	}
	public int getNumberOfHabits() {
		return this.numberOfHabits;
	}
	
	public void addHabit(int habitID) {
		this.habitIDs[this.numberOfHabits]=habitID;
		this.numberOfHabits+=1;
	}
	public Users(String userID,String password) {
		this.userID=userID;
		this.password=password;
		this.numberOfHabits=0;
	}
	public Users() {}
//	public String toString() {
//		return "id = "+userID+
//				"pass = "+password+
//				"uid = "+uid+
//				"len = "+habits.length;
//	}
}
