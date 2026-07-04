package com.shriya.backend.service;

import com.shriya.backend.dto.AuthResponse;
import com.shriya.backend.dto.LoginRequest;
import com.shriya.backend.dto.RegisterRequest;
import com.shriya.backend.entity.User;
import com.shriya.backend.enums.Role;
import com.shriya.backend.repository.UserRepository;
import com.shriya.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.repository.StudentProfileRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final EmailService emailService;

    private final StudentProfileRepository studentProfileRepository;

    public String register(RegisterRequest request) {

            System.out.println("Email received: " + request.getEmail());

    boolean exists = userRepository.existsByEmail(request.getEmail());

        System.out.println("Email exists: " + exists);

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .createdAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

StudentProfile profile = StudentProfile.builder()
        .user(savedUser)
        .fullName(savedUser.getFullName())
        .phone("")
        .college("")
        .degree("")
        .graduationYear(null)
        .skills("")
        .resumeUrl("")
        .bio("")
        .build();

studentProfileRepository.save(profile);

        try {
            emailService.sendWelcomeEmail(
                    user.getFullName(),
                    user.getEmail()
            );
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Student registered successfully";
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                "Login successful",
                user.getId(),
                user.getFullName(),
                user.getRole().name()
        );
    }
}