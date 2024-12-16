package com.habit.tracker.habitTracker.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.habit.tracker.habitTracker.model.Day;

@Repository
public interface DayRepo extends JpaRepository<Day, Long> {
    List<Day> findByHabitID(Long habitID);
    List<Day> findByHabitIDOrderByIdAsc(Long habitID);

    void deleteByHabitID(Long habitID);
}
