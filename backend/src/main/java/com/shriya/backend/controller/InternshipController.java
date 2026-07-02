package com.shriya.backend.controller;

import com.shriya.backend.dto.InternshipRequest;
import com.shriya.backend.entity.Internship;
import com.shriya.backend.service.InternshipService;
import com.shriya.backend.dto.RecommendedInternshipResponse;
import com.shriya.backend.dto.InternshipMatchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@RequiredArgsConstructor
public class InternshipController {

    private final InternshipService internshipService;

    @PostMapping
    public Internship createInternship(@RequestBody InternshipRequest request) {
        System.out.println("===== CREATE INTERNSHIP CALLED =====");
        return internshipService.createInternship(request);
    }

    @GetMapping
    public List<Internship> getAllInternships() {
        return internshipService.getAllInternships();
    }

    @GetMapping("/{id}")
    public Internship getInternshipById(@PathVariable Long id) {
        return internshipService.getInternshipById(id);
    }

    @PutMapping("/{id}")
public Internship updateInternship(@PathVariable Long id,
                                   @RequestBody InternshipRequest request) {
    return internshipService.updateInternship(id, request);
}

@DeleteMapping("/{id}")
public String deleteInternship(@PathVariable Long id) {
    internshipService.deleteInternship(id);
    return "Internship deleted successfully";
}

@GetMapping("/search")
public List<Internship> search(@RequestParam String title) {
    return internshipService.searchByTitle(title);
}

@GetMapping("/location")
public List<Internship> location(@RequestParam String location) {
    return internshipService.searchByLocation(location);
}

@GetMapping("/remote")
public List<Internship> remote() {
    return internshipService.getRemoteInternships();
}

@GetMapping("/latest")
public List<Internship> getLatestInternships() {
    return internshipService.getLatestInternships();
}

@GetMapping("/count")
public Long getInternshipCount() {
    return internshipService.getInternshipCount();
}

@GetMapping("/recommended/{userId}")
public List<RecommendedInternshipResponse> getRecommendedInternships(
        @PathVariable Long userId) {

    return internshipService.getRecommendedInternships(userId);

}

@GetMapping("/{internshipId}/match/{userId}")
public InternshipMatchResponse getMatch(
        @PathVariable Long internshipId,
        @PathVariable Long userId) {

    return internshipService.getInternshipMatch(internshipId, userId);

}
}