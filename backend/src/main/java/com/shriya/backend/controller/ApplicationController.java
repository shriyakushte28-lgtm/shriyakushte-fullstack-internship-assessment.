package com.shriya.backend.controller;

import com.shriya.backend.dto.ApplicationRequest;
import com.shriya.backend.dto.ApplicationSummaryResponse;
import com.shriya.backend.entity.Application;
import com.shriya.backend.enums.ApplicationStatus;
import com.shriya.backend.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor

public class ApplicationController {

    private final ApplicationService applicationService;

    @ExceptionHandler(ResponseStatusException.class)
public ResponseEntity<String> handleResponseStatusException(ResponseStatusException ex) {

    return ResponseEntity
            .status(ex.getStatusCode())
            .body(ex.getReason());

}

    @PostMapping
    public Application apply(@RequestBody ApplicationRequest request) {

        return applicationService.apply(request);

    }

    @GetMapping("/user/{userId}")
    public List<Application> getUserApplications(@PathVariable Long userId) {

        return applicationService.getUserApplications(userId);

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

@GetMapping("/user/{userId}/summary")
public ApplicationSummaryResponse getSummary(
        @PathVariable Long userId
) {

    return applicationService.getSummary(userId);

}

@GetMapping("/filter")
public List<Application> filterApplications(

        @RequestParam(required = false) String student,

        @RequestParam(required = false) String internship,

        @RequestParam(required = false) ApplicationStatus status

) {

    return applicationService.filterApplications(

            student,

            internship,

            status

    );

}

}