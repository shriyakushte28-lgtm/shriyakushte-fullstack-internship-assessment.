package com.shriya.backend.controller;

import com.shriya.backend.dto.StudentProfileRequest;
import com.shriya.backend.service.StudentProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}