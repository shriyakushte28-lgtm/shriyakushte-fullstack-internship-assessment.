package com.shriya.backend.controller;

import com.shriya.backend.enums.InternshipStatus;
import com.shriya.backend.repository.ApplicationRepository;
import com.shriya.backend.repository.InternshipRepository;
import com.shriya.backend.repository.StudentProfileRepository;
import com.shriya.backend.service.ApplicationService;
import com.shriya.backend.entity.Application;
import com.shriya.backend.enums.ApplicationStatus;
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

    @GetMapping("/statistics")
    public Map<String, Long> statistics() {

        Map<String, Long> data = new HashMap<>();

        data.put("students", studentProfileRepository.count());

        data.put("internships", internshipRepository.count());

        data.put("applications", applicationRepository.count());

        data.put("openInternships",
                internshipRepository.countByStatus(InternshipStatus.OPEN));

        return data;

    }

    @PutMapping("/applications/{id}/status")
public Application updateApplicationStatus(
        @PathVariable Long id,
        @RequestParam ApplicationStatus status
) {

    return applicationService.updateStatus(id, status);

}

}