package com.shriya.backend.controller;

import com.shriya.backend.dto.ApplicationRequest;
import com.shriya.backend.entity.Application;
import com.shriya.backend.enums.ApplicationStatus;
import com.shriya.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public Application apply(@RequestBody ApplicationRequest request) {

        return applicationService.apply(request);

    }

    @GetMapping("/student/{studentId}")
    public List<Application> getStudentApplications(@PathVariable Long studentId) {

        return applicationService.getStudentApplications(studentId);

    }

    @GetMapping("/test")
public String test() {
    return "Application Controller Working";
}

@PostMapping("/test")
public String postTest() {
    return "POST OK";
}

@GetMapping
public List<Application> getAllApplications() {

    return applicationService.getAllApplications();

}

@PutMapping("/{id}/status")
public Application updateStatus(
        @PathVariable Long id,
        @RequestParam ApplicationStatus status) {

    return applicationService.updateStatus(id, status);

}

}