package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DBService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int insert(String query) {
        return jdbcTemplate.update(query);
    }

    public void exec(String querry) {
        jdbcTemplate.execute(querry);
    }
}
