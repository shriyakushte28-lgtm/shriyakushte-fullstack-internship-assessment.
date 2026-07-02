package com.shriya.backend.controller;

import com.shriya.backend.dto.StudentProfileRequest;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.service.StudentProfileService;
import com.shriya.backend.dto.ProfileCompletionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.shriya.backend.dto.StudentSummaryResponse;
import java.util.List;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService profileService;

    @PostMapping("/{userId}")
    public String createProfile(
            @PathVariable Long userId,
            @RequestBody StudentProfileRequest request
    ) {
        return profileService.createProfile(userId, request);
    }

    @GetMapping("/{userId}")
public StudentProfile getProfile(@PathVariable Long userId) {

    return profileService.getProfile(userId);

}

@PutMapping("/{userId}")
public String updateProfile(
        @PathVariable Long userId,
        @RequestBody StudentProfileRequest request
) {

    return profileService.updateProfile(userId, request);

}

@GetMapping("/{userId}/completion")
public ProfileCompletionResponse getCompletion(
        @PathVariable Long userId
) {

    return new ProfileCompletionResponse(

            profileService.getProfileCompletion(userId)

    );

}

@GetMapping("/admin/students")
public List<StudentSummaryResponse> getAllStudents() {

    return profileService.getAllStudents();

}

@GetMapping("/admin/students/{id}")
public StudentProfile getStudentById(
        @PathVariable Long id
) {

    return profileService.getStudentById(id);

}
}