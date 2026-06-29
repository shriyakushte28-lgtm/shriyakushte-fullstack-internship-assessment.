package com.shriya.backend.service;

import com.shriya.backend.dto.InternshipRequest;
import com.shriya.backend.entity.Internship;
import com.shriya.backend.enums.InternshipStatus;
import com.shriya.backend.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InternshipService {

    private final InternshipRepository internshipRepository;

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
}