package com.habit.tracker.habitTracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users {
	@Id
	private String userID;
	private String password;
	private int numberOfHabits;
	private int[] habitIDs = new int[5];

	// public String getUserID() {
	// return userID;
	// }
	// public String getPassword() {
	// return password;
	// }
	// public int getNumberOfHabits() {
	// return this.numberOfHabits;
	// }
	// public int[] getHabitIDs() {
	// return this.habitIDs;
	// }

	public void addHabit(int habitID) {
		this.habitIDs[this.numberOfHabits] = habitID;
		this.numberOfHabits += 1;
	}

	public Users(String userID, String password) {
		this.userID = userID;
		this.password = password;
		this.numberOfHabits = 0;
	}

	// public String toString() {
	// return "id = "+userID+
	// "pass = "+password+
	// "uid = "+uid+
	// "len = "+habits.length;
	// }
}
