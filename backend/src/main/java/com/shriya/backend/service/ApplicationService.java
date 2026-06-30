package com.shriya.backend.service;

import com.shriya.backend.dto.ApplicationRequest;
import com.shriya.backend.entity.Application;
import com.shriya.backend.entity.Internship;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.enums.ApplicationStatus;
import com.shriya.backend.repository.ApplicationRepository;
import com.shriya.backend.repository.InternshipRepository;
import com.shriya.backend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final InternshipRepository internshipRepository;

    public Application apply(ApplicationRequest request) {

        System.out.println("===== APPLY METHOD CALLED =====");
        System.out.println(request);

        if (applicationRepository.existsByStudentIdAndInternshipId(
                request.getStudentId(),
                request.getInternshipId())) {

            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "You have already applied for this internship."
            );
        }

        StudentProfile student = studentProfileRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Internship internship = internshipRepository.findById(request.getInternshipId())
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        Application application = Application.builder()
                .student(student)
                .internship(internship)
                .coverLetter(request.getCoverLetter())
                .resumeUrl(request.getResumeUrl())
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        return applicationRepository.save(application);
}

    public List<Application> getStudentApplications(Long studentId) {

        return applicationRepository.findByStudentId(studentId);

    }

    public List<Application> getAllApplications() {

        return applicationRepository.findAllByOrderByAppliedAtDesc();

    }

    public Application updateStatus(Long id, ApplicationStatus status) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);

        return applicationRepository.save(application);

    }
}