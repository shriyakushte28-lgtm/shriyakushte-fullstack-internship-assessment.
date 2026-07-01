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

    public StudentProfile getProfile(Long userId) {

    return profileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

}

public String updateProfile(Long userId, StudentProfileRequest request) {

    StudentProfile profile = profileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

    profile.setFullName(request.getFullName());
    profile.setPhone(request.getPhone());
    profile.setCollege(request.getCollege());
    profile.setDegree(request.getDegree());
    profile.setGraduationYear(request.getGraduationYear());
    profile.setSkills(request.getSkills());
    profile.setResumeUrl(request.getResumeUrl());
    profile.setBio(request.getBio());

    profileRepository.save(profile);

    return "Profile updated successfully";

}
}
