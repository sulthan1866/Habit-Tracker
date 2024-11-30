package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EMailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendMail(String to, String subject, String body) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setText(body);
        mailMessage.setSubject(subject);
        mailSender.send(mailMessage);
    }
}
