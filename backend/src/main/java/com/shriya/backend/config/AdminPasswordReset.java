package com.shriya.backend.config;

import com.shriya.backend.entity.User;
import com.shriya.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminPasswordReset implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@gmail.com";
        String newPassword = "Admin@123";

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() ->
                        new RuntimeException("Admin account not found")
                );

        admin.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(admin);

        System.out.println("Admin password reset successfully");
    }
}