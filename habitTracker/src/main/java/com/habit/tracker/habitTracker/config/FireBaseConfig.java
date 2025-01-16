package com.habit.tracker.habitTracker.config;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FireBaseConfig {

    @Value("${FCM_SDK_KEY}")
    private String serviceAccountString;

    public FireBaseConfig() throws IOException {
        ByteArrayInputStream service = new ByteArrayInputStream(serviceAccountString.getBytes());
        FirebaseOptions options = FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(service))
                .build();
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

}
