package com.shriya.backend.config;

import com.shriya.backend.entity.User;
import com.shriya.backend.enums.Role;
import com.shriya.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String email = "admin@internsphere.com";
        String password = "123";

        User admin = userRepository.findByEmail(email)
                .orElse(
                        User.builder()
                                .fullName("Admin")
                                .email(email)
                                .role(Role.ADMIN)
                                .createdAt(LocalDateTime.now())
                                .build()
                );

        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole(Role.ADMIN);

        userRepository.save(admin);

        System.out.println("Admin account ready");
    }
}