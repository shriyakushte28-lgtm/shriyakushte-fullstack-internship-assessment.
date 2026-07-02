package com.shriya.backend.service;

import com.shriya.backend.dto.InternshipMatchResponse;
import com.shriya.backend.dto.InternshipRequest;
import com.shriya.backend.entity.Internship;
import com.shriya.backend.enums.InternshipStatus;
import com.shriya.backend.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.shriya.backend.dto.RecommendedInternshipResponse;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.repository.StudentProfileRepository;
import com.shriya.backend.dto.InternshipMatchResponse;

import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InternshipService {

    private final InternshipRepository internshipRepository;

    private final StudentProfileRepository studentProfileRepository;

    public Internship createInternship(InternshipRequest request) {

        Internship internship = Internship.builder()
                .title(request.getTitle())
                .companyName(request.getCompanyName())
                .description(request.getDescription())
                .location(request.getLocation())
                .isRemote(request.getIsRemote())
                .stipend(request.getStipend())
                .durationMonths(request.getDurationMonths())
                .skillsRequired(request.getSkillsRequired())
                .openings(request.getOpenings())
                .deadline(request.getDeadline())
                .status(InternshipStatus.OPEN)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return internshipRepository.save(internship);
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public Internship getInternshipById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    public Internship updateInternship(Long id, InternshipRequest request) {

    Internship internship = internshipRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Internship not found"));

    internship.setTitle(request.getTitle());
    internship.setCompanyName(request.getCompanyName());
    internship.setDescription(request.getDescription());
    internship.setLocation(request.getLocation());
    internship.setIsRemote(request.getIsRemote());
    internship.setStipend(request.getStipend());
    internship.setDurationMonths(request.getDurationMonths());
    internship.setSkillsRequired(request.getSkillsRequired());
    internship.setOpenings(request.getOpenings());
    internship.setDeadline(request.getDeadline());
    internship.setUpdatedAt(java.time.LocalDateTime.now());

    return internshipRepository.save(internship);
}

public void deleteInternship(Long id) {
    internshipRepository.deleteById(id);
}

public List<Internship> searchByTitle(String title) {
    return internshipRepository.findByTitleContainingIgnoreCase(title);
}

public List<Internship> searchByLocation(String location) {
    return internshipRepository.findByLocationContainingIgnoreCase(location);
}

public List<Internship> getRemoteInternships() {
    return internshipRepository.findByIsRemote(true);
}

public List<Internship> getLatestInternships() {
    return internshipRepository.findTop6ByOrderByCreatedAtDesc();
}

public Long getInternshipCount() {
    return internshipRepository.count();
}

public List<RecommendedInternshipResponse> getRecommendedInternships(Long userId) {

    StudentProfile student = studentProfileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student profile not found"));

    Set<String> studentSkills = Arrays.stream(student.getSkills().split(","))
            .map(String::trim)
            .map(String::toLowerCase)
            .collect(Collectors.toSet());

    return internshipRepository.findByStatus(InternshipStatus.OPEN)
            .stream()
            .map(internship -> {

                Set<String> internshipSkills = Arrays.stream(internship.getSkillsRequired().split(","))
                        .map(String::trim)
                        .map(String::toLowerCase)
                        .collect(Collectors.toSet());

                Set<String> commonSkills = new HashSet<>(studentSkills);
commonSkills.retainAll(internshipSkills);

int match = studentSkills.isEmpty()
        ? 0
        : (commonSkills.size() * 100) / studentSkills.size();

List<String> matchedSkills =
        commonSkills.stream().toList();

return RecommendedInternshipResponse.builder()
        .id(internship.getId())
        .title(internship.getTitle())
        .companyName(internship.getCompanyName())
        .location(internship.getLocation())
        .stipend(internship.getStipend())
        .matchPercentage(match)
        .matchedSkills(matchedSkills)
        .build();

            })
            .filter(internship -> internship.getMatchPercentage() >= 50)
.sorted(
        Comparator.comparing(
                RecommendedInternshipResponse::getMatchPercentage
        ).reversed()
)
.limit(5)
.toList();

}

public InternshipMatchResponse getInternshipMatch(Long internshipId, Long userId) {

    StudentProfile student = studentProfileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student profile not found"));

    Internship internship = internshipRepository.findById(internshipId)
            .orElseThrow(() -> new RuntimeException("Internship not found"));

    Set<String> studentSkills = Arrays.stream(student.getSkills().split(","))
            .map(String::trim)
            .filter(skill -> !skill.isBlank())
            .collect(Collectors.toSet());

    Set<String> internshipSkills = Arrays.stream(internship.getSkillsRequired().split(","))
            .map(String::trim)
            .filter(skill -> !skill.isBlank())
            .collect(Collectors.toSet());

    List<String> matchedSkills = internshipSkills.stream()
            .filter(studentSkills::contains)
            .toList();

    List<String> missingSkills = internshipSkills.stream()
            .filter(skill -> !studentSkills.contains(skill))
            .toList();

    int percentage = internshipSkills.isEmpty()
            ? 0
            : (matchedSkills.size() * 100) / internshipSkills.size();

    return InternshipMatchResponse.builder()
        .matchPercentage(percentage)
        .matchedSkillCount(matchedSkills.size())
        .totalRequiredSkills(internshipSkills.size())
        .matchedSkills(matchedSkills)
        .missingSkills(missingSkills)
        .build();

}
}