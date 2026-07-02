package com.shriya.backend.controller;

import com.shriya.backend.dto.SavedInternshipRequest;
import com.shriya.backend.entity.SavedInternship;
import com.shriya.backend.service.SavedInternshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved")
@RequiredArgsConstructor
public class SavedInternshipController {

    private final SavedInternshipService savedInternshipService;

    @PostMapping
    public SavedInternship saveInternship(
            @RequestBody SavedInternshipRequest request) {

        return savedInternshipService.saveInternship(request);

    }

    @GetMapping("/user/{userId}")
    public List<SavedInternship> getSavedInternships(
            @PathVariable Long userId) {

        return savedInternshipService.getSavedInternships(userId);

    }

    @DeleteMapping("/{userId}/{internshipId}")
    public String removeSavedInternship(
            @PathVariable Long userId,
            @PathVariable Long internshipId) {

        savedInternshipService.removeSavedInternship(
                userId,
                internshipId);

        return "Internship removed successfully.";

    }

    @GetMapping("/check/{userId}/{internshipId}")
    public boolean isSaved(
            @PathVariable Long userId,
            @PathVariable Long internshipId) {

        return savedInternshipService.isSaved(
                userId,
                internshipId);

    }

}