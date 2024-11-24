package com.habit.tracker.habitTracker.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.habit.tracker.habitTracker.model.Habit;

@Repository
public interface HabitsRepo extends JpaRepository<Habit, Long> {

	List<Habit> findByUserID(String userID);

	Habit findByUserIDAndHabitID(String userID, Long habitID);

}
