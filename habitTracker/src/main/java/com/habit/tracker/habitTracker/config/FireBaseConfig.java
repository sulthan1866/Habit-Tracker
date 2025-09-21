package com.habit.tracker.habitTracker.config;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FireBaseConfig {

    // @Value("${FCM_SDK_KEY}")
    private String serviceAccountString = "{'type': 'service_account','project_id': 'habit-tracker-1866','private_key_id': '1f0aceb18bf66321f7afc18d1082e0113125f3a1','private_key': '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQvqe40fraIoPk\nJ834Z2/j4TjWbxOG1DVG/4mNRGLIF7LexGxYVn4H7BDo/VJx0LWqCjVpZdtLzX3n\nhoGdimnUmX8H2RmxkcvMTBTi080o0rJfiJIa3vFnq7iZ/ofkm9tLCno8aVw2wZKM\njtNxMWPY8TKklYTtd6uCAACC13ZhWOiHFJN2hRPatXzFVCJQKj4If4J0Z2uxm6oP\nu/euqpFVg3nZSiZa9QLODjleK270W6nCyGH0wbMKh+YaNYvaqolFkdPfn+IojyK/\nAcuZzyCY9EYD+WVYydbH1cpZOwDhReAk1Vy22F/YkxJRssrU4D5UzyJzc6uiQGLV\nuH88+8CBAgMBAAECggEAAYHPX99Q+ftB39NJXn7Hbx4Xnx11nvmMLgxTMMBQrOJ2\nKrtg/38mHTo3LenyivahcaIdzCpJf8/Stem9yMKMmJ3ANfEjaUGw3qNx2wiBvqa9\nBcFcge34MOYTlNXKgxAcoGtJqjMN6MmrbFktgc+sIYdOBPP9BfqBPBTCPC+YW8v9\nV3ZY6R0OlsMPe+a8tPovX3xX26zHjE+8fbCh4OE30awl/IY6UxoZizOb7MhnUr5r\nAaguUDG1M5uizgbqCGZMs5OnINR2oYAOGEwCCKEY6HLIZxRvRWYLQAoKg2ifSjSZ\nG+l8OcwwDTyCHcER+QFc+I47LK0JF4Zo4rk1jJ284QKBgQD1hYDB7TKZryRh8K+n\nUBRPJ2F9obV86cxSE6Tqs344U7RZbPxNCzo1fhQ1FnH4eIzze560nIy8hkT6irvm\nXA4Ed9YjUY/mGGIuTUeKV3Ug8XegC0SrODazCCszgJnAbdodbkV9NT5mcn1mylE2\nc2orIQJ3nnsFOTdaAFY/k1FT4QKBgQDZp1cNoXvkonuMtT5Zk3plNXABIJldDeQL\nUHGSTxoMItj3LRr800MVg7MA32DPFb1/8lqKKNZAYoABGOavlnluZnAnQayn7t5D\n+UnxpqUdz1HZ1Y7q4L8njwR1kK6JBw1ha6kTWDDFctWeZtWYmcBYvLGKiabs4f4K\nxgOakZYAoQKBgQCeIag2PvGSLk2+juhzWI5cFL8jzV044NRqIKDdUVIAMVk9J4aw\nkISjI1scfiJVqD8QKxSiuxmh6tDOlUBENBILKqvO/58w0Y+axsdHAOE9oIgtmlRV\n+tSwJpi8iR195MLQpc83v207So4eADyiV1+P+6i9JmORj7Jo00K5m8aLwQKBgDk7\ncH+sE9j2BMjmK8QALLIKUC5rtQgsC+gRuht/41iHnUe5u5v5rW0t2VcEZf9uNws6\n3iXwQQ5jGEexlY9cYQfvtdQMx+rMu/NhzNjXOhnRlzNRnagTexBa4hBMACkWCqWw\nWqA0k3aIELX7UnUzEMoErCbCtXsaneOVWAM//xKhAoGAeWCCo7HowtzP3mmwNGwx\n6Hs0jMr6IYJzFwHRi2bWc3MZn4uCtxx3QWJXgXHIiuZ58xM/zCuX67u0/3FFJB/c\ntthHPgQMEWupGFJKppxcvYawsUUzzGZVm3wsCK3hA8DhtNLayQgs4rIHx4ipVpLS\nr3LHJsrN+WYsCnLOTCvGUGM=\n-----END PRIVATE KEY-----\n','client_email': 'firebase-adminsdk-7kguh@habit-tracker-1866.iam.gserviceaccount.com','client_id': '114649380714735721613','auth_uri': 'https://accounts.google.com/o/oauth2/auth','token_uri': 'https://oauth2.googleapis.com/token','auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs','client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7kguh%40habit-tracker-1866.iam.gserviceaccount.com','universe_domain': 'googleapis.com'}";

    @PostConstruct
    public void initFirebase() throws IOException {
        ByteArrayInputStream service = new ByteArrayInputStream(serviceAccountString.getBytes());
        FirebaseOptions options = FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(service))
                .build();
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

}
