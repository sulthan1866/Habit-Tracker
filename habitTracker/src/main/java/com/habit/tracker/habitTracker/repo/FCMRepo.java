package com.habit.tracker.habitTracker.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.habit.tracker.habitTracker.model.FCMToken;

@Repository
public interface FCMRepo extends JpaRepository<FCMToken, Long> {

    FCMToken findByUserID(String userID);

    void deleteByUserID(String userID);

}
