package com.habit.tracker.habitTracker.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.habit.tracker.habitTracker.model.Day;

@Repository
public interface DayRepo extends JpaRepository<Day, Long> {
    List<Day> findByHabitID(Long habitID);

    List<Day> findByHabitIDOrderByIdAsc(Long habitID);

    void deleteByHabitID(Long habitID);

    @Query("SELECT e FROM Day e WHERE e.habitID = :habitid AND e.today BETWEEN :startDate AND :endDate ORDER BY e.id ASC")
    List<Day> findRangeOfDays(@Param("habitid") Long habitid, @Param("startDate") int startDate,
            @Param("endDate") int endDate);

}
