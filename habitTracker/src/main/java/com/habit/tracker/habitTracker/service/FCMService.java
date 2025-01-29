package com.habit.tracker.habitTracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.habit.tracker.habitTracker.model.FCMToken;
import com.habit.tracker.habitTracker.repo.FCMRepo;

@Service
public class FCMService {

    @Autowired
    FCMRepo fcmRepo;

    public FCMToken addToken(FCMToken token) {
        return fcmRepo.save(token);
    }

    public FCMToken getToken(String userID) {
        return fcmRepo.findByUserID(userID);
    }

    @Transactional
    public boolean deleteToken(String userID) {
        try {
            fcmRepo.deleteByUserID(userID);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public void sendPushNotification(String title, String body, FCMToken token) throws Exception {

        Notification notification = Notification.builder().setTitle(title).setBody(body).build();

        Message message = Message.builder().setToken(token.getToken()).setNotification(notification)
                .build();
        FirebaseMessaging.getInstance().send(message);
    }

    public void sendPushNotificationToAllUsers(String title, String body) throws Exception {
        List<FCMToken> tokens = fcmRepo.findAll();
        for (FCMToken token : tokens) {
            Notification notification = Notification.builder().setTitle(title).setBody(body).build();
            Message message = Message.builder().setToken(token.getToken()).setNotification(notification)
                    .build();
            FirebaseMessaging.getInstance().send(message);
        }
    }

}
