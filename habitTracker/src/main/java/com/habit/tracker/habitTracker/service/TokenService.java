package com.habit.tracker.habitTracker.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.habit.tracker.habitTracker.model.Token;
import com.habit.tracker.habitTracker.repo.TokenRepo;

@Service
public class TokenService {

    @Autowired
    TokenRepo repo;

    public String createToken(String email) {

        Token tokenDetails = new Token();

        String token = UUID.randomUUID().toString();
        tokenDetails.setEmail(email);
        tokenDetails.setToken(token);
        tokenDetails.setExpirationTime(LocalDateTime.now().plusMinutes(30));
        repo.save(tokenDetails);
        return token;

    }

    public boolean isValidToken(String token) {
        Token tokenDetails = repo.findByToken(token);
        return tokenDetails != null && tokenDetails.getExpirationTime().isAfter(LocalDateTime.now());
    }

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    @Transactional
    public void deleteToken() {
        repo.deleteByExpirationTimeLessThan(LocalDateTime.now());
    }

    public boolean hasAlreadySentEmail(String email) {
        Token tokenDetails = repo.findByEmail(email);
        return tokenDetails != null && tokenDetails.getExpirationTime().isAfter(LocalDateTime.now().plusMinutes(5));
    }

    public String getMailByToken(String token) {
        Token tokenDetails = repo.findByToken(token);
        return tokenDetails.getEmail();
    }

}
