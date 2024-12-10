package com.habit.tracker.habitTracker.repo;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Component;

import com.habit.tracker.habitTracker.model.Day;
import com.habit.tracker.habitTracker.model.Habit;

@Component
public class HabitsRepo implements IHabitsRepo {

    @Autowired
    IHabitsRepo habitsRepo;

    @Autowired
    DayRepo dayRepo;

    @Override
    public <S extends Habit> S saveAndFlush(S entity) {
        return habitsRepo.saveAndFlush(entity);
    }

    @Override
    public <S extends Habit> List<S> saveAllAndFlush(Iterable<S> entities) {
        return habitsRepo.saveAllAndFlush(entities);
    }

    @Override
    public void deleteAllInBatch(Iterable<Habit> entities) {
        habitsRepo.deleteAllInBatch(entities);
    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> ids) {
        habitsRepo.deleteAllByIdInBatch(ids);
    }

    @Override
    public void deleteAllInBatch() {
        habitsRepo.deleteAllInBatch();
    }

    @Override
    public Habit getOne(Long id) {
        return habitsRepo.getOne(id);
    }

    @Override
    public Habit getById(Long id) {
        return habitsRepo.getById(id);
    }

    @Override
    public Habit getReferenceById(Long id) {
        return habitsRepo.getReferenceById(id);
    }

    @Override
    public <S extends Habit> List<S> findAll(Example<S> example) {
        return habitsRepo.findAll(example);
    }

    @Override
    public <S extends Habit> List<S> findAll(Example<S> example, Sort sort) {
        return habitsRepo.findAll(example, sort);
    }

    @Override
    public <S extends Habit> List<S> saveAll(Iterable<S> entities) {
        return habitsRepo.saveAll(entities);
    }

    @Override
    public List<Habit> findAll() {
        return habitsRepo.findAll();
    }

    @Override
    public List<Habit> findAllById(Iterable<Long> ids) {
        return habitsRepo.findAllById(ids);
    }

    @Override
    public boolean existsById(Long id) {
        return existsById(id);
    }

    @Override
    public long count() {
        return habitsRepo.count();
    }

    @Override
    public void delete(Habit entity) {
        habitsRepo.delete(entity);
        dayRepo.deleteByHabitID(entity.getHabitID());
    }

    @Override
    public void deleteAllById(Iterable<? extends Long> ids) {
        habitsRepo.deleteAllById(ids);
    }

    @Override
    public void deleteAll(Iterable<? extends Habit> entities) {
        habitsRepo.deleteAll(entities);
    }

    @Override
    public void deleteAll() {
        habitsRepo.deleteAll();
        dayRepo.deleteAll();
    }

    @Override
    public List<Habit> findAll(Sort sort) {
        return habitsRepo.findAll(sort);
    }

    @Override
    public Page<Habit> findAll(Pageable pageable) {
        return habitsRepo.findAll(pageable);
    }

    @Override
    public <S extends Habit> Optional<S> findOne(Example<S> example) {
        return habitsRepo.findOne(example);
    }

    @Override
    public <S extends Habit> Page<S> findAll(Example<S> example, Pageable pageable) {
        return habitsRepo.findAll(example, pageable);
    }

    @Override
    public <S extends Habit> long count(Example<S> example) {
        return habitsRepo.count(example);
    }

    @Override
    public <S extends Habit> boolean exists(Example<S> example) {
        return habitsRepo.exists(example);
    }

    @Override
    public <S extends Habit, R> R findBy(Example<S> example, Function<FetchableFluentQuery<S>, R> queryFunction) {
        return habitsRepo.findBy(example, queryFunction);
    }

    @Override
    public Optional<Habit> findById(Long id) {
        Optional<Habit> habit = habitsRepo.findById(id);
        List<Day> days = dayRepo.findByHabitID(id);
        habit.get().setDays(days);
        return habit;
    }

    @Override
    public List<Habit> findByUserID(String userID) {
        List<Habit> habits = habitsRepo.findByUserID(userID);
        for (Habit habit : habits) {
            habit.setDays(dayRepo.findByHabitID(habit.getHabitID()));
        }
        return habits;
    }

    @Override
    public Habit findByUserIDAndHabitID(String userID, Long habitID) {
        Habit habit = habitsRepo.findByUserIDAndHabitID(userID, habitID);
        habit.setDays(dayRepo.findByHabitID(habit.getHabitID()));
        return habit;
    }

    @Override
    public <S extends Habit> S save(S entity) {
        S habit = habitsRepo.save(entity);
        for (int i = 0; i < habit.getDays().size(); i++) {
            habit.getDays().get(i).setHabitID(habit.getHabitID());
            dayRepo.save(habit.getDays().get(i));
        }
        return habit;
    }

    @Override
    public void deleteById(Long id) {
        dayRepo.deleteAll(this.findById(id).get().getDays());
        habitsRepo.deleteById(id);
    }

    @Override
    public void flush() {
        habitsRepo.flush();
        dayRepo.flush();
    }

}
