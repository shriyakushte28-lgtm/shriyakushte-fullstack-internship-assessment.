package com.shriya.backend.controller;

import com.shriya.backend.enums.InternshipStatus;
import com.shriya.backend.repository.ApplicationRepository;
import com.shriya.backend.repository.InternshipRepository;
import com.shriya.backend.repository.StudentProfileRepository;
import com.shriya.backend.service.AdminService;
import com.shriya.backend.service.ApplicationService;
import com.shriya.backend.dto.AdminAnalyticsResponse;
import com.shriya.backend.dto.AdminDashboardResponse;
import com.shriya.backend.entity.Application;
import com.shriya.backend.enums.ApplicationStatus;
import com.shriya.backend.dto.AdminProfileRequest;
import com.shriya.backend.dto.AdminProfileResponse;
import com.shriya.backend.dto.ChangePasswordRequest;
import com.shriya.backend.dto.PortalSettingsRequest;
import com.shriya.backend.entity.PortalSettings;
import com.shriya.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final StudentProfileRepository studentProfileRepository;
    private final InternshipRepository internshipRepository;
    private final ApplicationRepository applicationRepository;
    private final ApplicationService applicationService;
    private final AdminService adminService;

    @GetMapping("/dashboard")
public AdminDashboardResponse dashboard() {

    return AdminDashboardResponse.builder()

            .students(studentProfileRepository.count())

            .internships(internshipRepository.count())

            .applications(applicationRepository.count())

            .openInternships(
                    internshipRepository.countByStatus(
                            InternshipStatus.OPEN
                    )
            )

            .recentApplications(
                    applicationRepository.findTop5ByOrderByAppliedAtDesc()
            )

            .recentStudents(
                    studentProfileRepository.findTop5ByOrderByIdDesc()
            )

            .latestInternships(
                    internshipRepository.findTop5ByOrderByCreatedAtDesc()
            )

            .build();

}

    @PutMapping("/applications/{id}/status")
public Application updateApplicationStatus(
        @PathVariable Long id,
        @RequestParam ApplicationStatus status
) {

    return applicationService.updateStatus(id, status);

}

@GetMapping("/analytics")
public AdminAnalyticsResponse analytics() {

    return adminService.getAnalytics();

}

@GetMapping("/profile/{id}")
public AdminProfileResponse getProfile(@PathVariable Long id) {
    return adminService.getAdminProfile(id);
}

@PutMapping("/profile/{id}")
public User updateProfile(
        @PathVariable Long id,
        @RequestBody AdminProfileRequest request) {

    return adminService.updateAdminProfile(id, request);

}

@PutMapping("/change-password/{id}")
public String changePassword(
        @PathVariable Long id,
        @RequestBody ChangePasswordRequest request) {

    return adminService.changePassword(id, request);

}

@GetMapping("/settings")
public PortalSettings getSettings() {

    return adminService.getSettings();

}

@PutMapping("/settings")
public PortalSettings updateSettings(
        @RequestBody PortalSettingsRequest request) {

    return adminService.updateSettings(request);

}

}