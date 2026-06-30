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

        System.out.println("Finding student...");

        StudentProfile student = studentProfileRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        System.out.println("Student found: " + student.getId());

        System.out.println("Finding internship...");

        Internship internship = internshipRepository.findById(request.getInternshipId())
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        System.out.println("Internship found: " + internship.getId());

        Application application = Application.builder()
                .student(student)
                .internship(internship)
                .coverLetter(request.getCoverLetter())
                .resumeUrl(request.getResumeUrl())
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        System.out.println("Saving application...");

        Application saved = applicationRepository.save(application);

        System.out.println("Saved successfully!");

        return saved;

    } catch (Exception e) {
        e.printStackTrace();
        throw e;
    }
}

    public List<Application> getStudentApplications(Long studentId) {

        return applicationRepository.findByStudentId(studentId);

    }

}