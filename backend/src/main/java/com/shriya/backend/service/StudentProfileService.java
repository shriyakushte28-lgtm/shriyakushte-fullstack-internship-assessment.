package com.shriya.backend.service;

import com.shriya.backend.dto.StudentProfileRequest;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.entity.User;
import com.shriya.backend.repository.StudentProfileRepository;
import com.shriya.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentProfileService {

    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;

    public String createProfile(Long userId, StudentProfileRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (profileRepository.existsByUser(user)) {
            throw new RuntimeException("Profile already exists");
        }

        StudentProfile profile = StudentProfile.builder()
                .user(user)
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .college(request.getCollege())
                .degree(request.getDegree())
                .graduationYear(request.getGraduationYear())
                .skills(request.getSkills())
                .resumeUrl(request.getResumeUrl())
                .bio(request.getBio())
                .build();

        profileRepository.save(profile);

        return "Profile created successfully";
    }
}
