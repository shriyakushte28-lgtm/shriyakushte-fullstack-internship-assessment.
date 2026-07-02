package com.shriya.backend.service;

import com.shriya.backend.dto.StudentProfileRequest;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.entity.User;
import com.shriya.backend.repository.StudentProfileRepository;
import com.shriya.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.shriya.backend.dto.StudentSummaryResponse;
import java.util.List;

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

public int getProfileCompletion(Long userId) {

    StudentProfile profile = profileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));

    int completed = 0;

    if (profile.getFullName() != null && !profile.getFullName().isBlank())
        completed++;

    if (profile.getPhone() != null && !profile.getPhone().isBlank())
        completed++;

    if (profile.getCollege() != null && !profile.getCollege().isBlank())
        completed++;

    if (profile.getDegree() != null && !profile.getDegree().isBlank())
        completed++;

    if (profile.getGraduationYear() != null)
        completed++;

    if (profile.getSkills() != null && !profile.getSkills().isBlank())
        completed++;

    if (profile.getResumeUrl() != null && !profile.getResumeUrl().isBlank())
        completed++;

    if (profile.getBio() != null && !profile.getBio().isBlank())
        completed++;

    return (completed * 100) / 8;

}

public List<StudentSummaryResponse> getAllStudents() {

    return profileRepository.findAll()
            .stream()
            .map(profile -> StudentSummaryResponse.builder()
                    .id(profile.getId())
                    .userId(profile.getUser().getId())
                    .fullName(profile.getFullName())
                    .email(profile.getUser().getEmail())
                    .college(profile.getCollege())
                    .degree(profile.getDegree())
                    .build())
            .toList();

}

public StudentProfile getStudentById(Long id) {

    return profileRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found"));

}
}
