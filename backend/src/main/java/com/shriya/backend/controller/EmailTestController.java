package com.shriya.backend.controller;

import com.shriya.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/api/test-email")
    public String sendTestEmail() {

        emailService.sendEmail(
                "shriyakushte28@gmail.com",
                "InternSphere Email Test",
                "Congratulations! Your email service is working successfully."
        );

        return "Email Sent Successfully!";
    }
}