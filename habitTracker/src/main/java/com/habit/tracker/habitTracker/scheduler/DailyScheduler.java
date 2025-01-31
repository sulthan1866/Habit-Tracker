package com.habit.tracker.habitTracker.scheduler;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.repo.HabitsRepo;

@Component
public class DailyScheduler {

    @Autowired
    HabitsRepo habitsRepo;

    @Scheduled(cron = "0 30 18 * * *")
    public void moveStreak() {
        List<Habit> habits = habitsRepo.findAllHabitsWithCurrDay();

        for (Habit habit : habits) {
            int numDays = habit.getDays().size();
            if (numDays == 1) {
                habit.setStreak(habit.getStreak() + 1);
                habit.setMaxStreak(Math.max(habit.getStreak(), habit.getMaxStreak()));
            } else if (numDays != 0) {
                if (habit.getDays().get(numDays - 1).getToday() != habit.getCurrDay()) {
                    if (habit.getDays().get(numDays - 1).getDate().toLocalDate()
                            .isEqual(LocalDate.now())) {
                        habit.setStreak(habit.getStreak() + 1);
                        habit.setMaxStreak(Math.max(habit.getStreak(), habit.getMaxStreak()));
                    } else {
                        habit.setStreak(0);
                    }
                } else if (habit.getDays().get(numDays - 2).getDate().toLocalDate()
                        .isEqual(LocalDate.now())) {
                    habit.setStreak(habit.getStreak() + 1);
                    habit.setMaxStreak(Math.max(habit.getStreak(), habit.getMaxStreak()));
                } else {
                    habit.setStreak(0);
                }
            }
            if (numDays == 0 || habit.getDays().get(numDays - 1).getToday() != habit.getCurrDay())
                continue;
            if (numDays == 1 || habit.getDays().get(numDays - 2).isCompleted()) {

                habit.setCurrDay(habit.getCurrDay() + 1);

            }
            habitsRepo.saveHabit(habit);

        }
    }

}
