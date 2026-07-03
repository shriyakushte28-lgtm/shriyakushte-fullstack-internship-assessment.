package com.shriya.backend.service;

import com.shriya.backend.dto.AdminAnalyticsResponse;
import com.shriya.backend.entity.Application;
import com.shriya.backend.enums.ApplicationStatus;
import com.shriya.backend.repository.ApplicationRepository;
import com.shriya.backend.repository.InternshipRepository;
import com.shriya.backend.dto.AdminProfileRequest;
import com.shriya.backend.dto.AdminProfileResponse;
import com.shriya.backend.dto.ChangePasswordRequest;
import com.shriya.backend.dto.PortalSettingsRequest;
import com.shriya.backend.entity.PortalSettings;
import com.shriya.backend.entity.User;
import com.shriya.backend.repository.PortalSettingsRepository;
import com.shriya.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ApplicationRepository applicationRepository;
    private final InternshipRepository internshipRepository;
    private final UserRepository userRepository;
private final PortalSettingsRepository portalSettingsRepository;
private final BCryptPasswordEncoder passwordEncoder;

    public AdminAnalyticsResponse getAnalytics() {

        List<Application> applications = applicationRepository.findAll();

        Map<String, Long> statusChart = new HashMap<>();

        statusChart.put(
                "Pending",
                applications.stream()
                        .filter(a -> a.getStatus() == ApplicationStatus.PENDING)
                        .count());

        statusChart.put(
                "Shortlisted",
                applications.stream()
                        .filter(a -> a.getStatus() == ApplicationStatus.SHORTLISTED)
                        .count());

        statusChart.put(
                "Accepted",
                applications.stream()
                        .filter(a -> a.getStatus() == ApplicationStatus.ACCEPTED)
                        .count());

        statusChart.put(
                "Rejected",
                applications.stream()
                        .filter(a -> a.getStatus() == ApplicationStatus.REJECTED)
                        .count());

        Map<String, Long> monthlyApplications = new HashMap<>();

        for (Month month : Month.values()) {

            long count = applications.stream()

                    .filter(a -> a.getAppliedAt() != null)

                    .filter(a ->
                            a.getAppliedAt().getMonth() == month)

                    .count();

            monthlyApplications.put(month.name(), count);

        }

        String mostAppliedInternship = "No Applications";

        if (!applications.isEmpty()) {

            mostAppliedInternship = applications.stream()

                    .collect(java.util.stream.Collectors.groupingBy(

                            a -> a.getInternship().getTitle(),

                            java.util.stream.Collectors.counting()

                    ))

                    .entrySet()

                    .stream()

                    .max(Map.Entry.comparingByValue())

                    .get()

                    .getKey();

        }

        double averageApplications = internshipRepository.count() == 0

                ? 0

                : (double) applications.size()

                / internshipRepository.count();

        long pendingReviews = statusChart.get("Pending");

        double acceptanceRate = applications.isEmpty()

                ? 0

                : statusChart.get("Accepted") * 100.0

                / applications.size();

        return AdminAnalyticsResponse.builder()

                .statusChart(statusChart)

                .monthlyApplications(monthlyApplications)

                .mostAppliedInternship(mostAppliedInternship)

                .averageApplications(
                        Math.round(averageApplications * 100.0) / 100.0
                )

                .pendingReviews(pendingReviews)

                .acceptanceRate(
                        Math.round(acceptanceRate * 100.0) / 100.0
                )

                .build();

    }

    public AdminProfileResponse getAdminProfile(Long id) {

    User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Admin not found"));

return AdminProfileResponse.builder()
        .id(user.getId())
        .fullName(user.getFullName())
        .email(user.getEmail())
        .role(user.getRole())
        .createdAt(user.getCreatedAt())
        .build();

}

public User updateAdminProfile(Long id, AdminProfileRequest request) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Admin not found"));

    user.setFullName(request.getFullName());
    user.setEmail(request.getEmail());

    return userRepository.save(user);

}

public String changePassword(Long id, ChangePasswordRequest request) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Admin not found"));

    if (!passwordEncoder.matches(
            request.getCurrentPassword(),
            user.getPassword())) {

        throw new RuntimeException("Current password is incorrect");

    }

    user.setPassword(
            passwordEncoder.encode(request.getNewPassword())
    );

    userRepository.save(user);

    return "Password updated successfully";

}

public PortalSettings getSettings() {

    return portalSettingsRepository.findById(1L)
            .orElseGet(() -> {

                PortalSettings settings = PortalSettings.builder()

                        .portalName("Student Internship Portal")
                        .supportEmail("support@gmail.com")
                        .maxApplications(5)
                        .internshipDuration("6 Months")
                        .emailNotifications(true)
                        .registrationAlerts(true)
                        .internshipAlerts(true)
                        .weeklyReports(false)
                        .darkMode(false)
                        .sessionTimeout(30)
                        .build();

                return portalSettingsRepository.save(settings);

            });

}

public PortalSettings updateSettings(
        PortalSettingsRequest request) {

    PortalSettings settings = portalSettingsRepository
            .findById(1L)
            .orElse(new PortalSettings());

    settings.setId(1L);
    settings.setPortalName(request.getPortalName());
    settings.setSupportEmail(request.getSupportEmail());
    settings.setMaxApplications(request.getMaxApplications());
    settings.setInternshipDuration(request.getInternshipDuration());
    settings.setEmailNotifications(request.getEmailNotifications());
    settings.setRegistrationAlerts(request.getRegistrationAlerts());
    settings.setInternshipAlerts(request.getInternshipAlerts());
    settings.setWeeklyReports(request.getWeeklyReports());
    settings.setDarkMode(request.getDarkMode());
    settings.setSessionTimeout(request.getSessionTimeout());

    return portalSettingsRepository.save(settings);

}

}