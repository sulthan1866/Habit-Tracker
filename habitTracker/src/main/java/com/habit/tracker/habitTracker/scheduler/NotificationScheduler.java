package com.habit.tracker.habitTracker.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.habit.tracker.habitTracker.service.FCMService;

@Component
public class NotificationScheduler {

    @Autowired
    private FCMService fcmService;

    @Scheduled(cron = "0 12 20 * * *")
    public void sendNotification() throws Exception {
        fcmService.sendPushNotificationToAllUsers("Daily Remainder", "Start doing your habits now !");
    }

}
