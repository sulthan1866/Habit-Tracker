package com.habit.tracker.habitTracker.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.habit.tracker.habitTracker.model.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, String> {

	Users findByUserID(String userID);

	Users findByEmail(String email);

	Users findByUserIDOrEmail(String userID, String email);

}
