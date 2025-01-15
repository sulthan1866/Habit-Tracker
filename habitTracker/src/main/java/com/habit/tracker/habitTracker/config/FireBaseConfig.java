package com.habit.tracker.habitTracker.config;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FireBaseConfig {
    public FireBaseConfig() throws IOException {
        InputStream service = getClass().getClassLoader().getResourceAsStream(
                "habit-tracker-1866-firebase-adminsdk-7kguh-eb435d19ac.json");
        FirebaseOptions options = FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(service))
                .build();
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

}
