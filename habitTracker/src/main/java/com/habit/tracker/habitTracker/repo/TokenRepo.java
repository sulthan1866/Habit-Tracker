package com.habit.tracker.habitTracker.repo;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.habit.tracker.habitTracker.model.Token;

@Repository
public interface TokenRepo extends JpaRepository<Token, String> {

    Token findByToken(String token);

    void deleteByExpirationTimeLessThan(LocalDateTime now);

    Token findByEmail(String email);

}
