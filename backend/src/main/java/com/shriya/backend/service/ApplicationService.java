package com.shriya.backend.service;

import com.shriya.backend.dto.ApplicationRequest;
import com.shriya.backend.dto.ApplicationSummaryResponse;
import com.shriya.backend.entity.Application;
import com.shriya.backend.entity.Internship;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.enums.ApplicationStatus;
import com.shriya.backend.repository.ApplicationRepository;
import com.shriya.backend.repository.InternshipRepository;
import com.shriya.backend.repository.StudentProfileRepository;
import com.shriya.backend.dto.NotificationRequest;
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
    private final NotificationService notificationService;

    public Application apply(ApplicationRequest request) {

        System.out.println("===== APPLY METHOD CALLED =====");
        System.out.println(request);

        StudentProfile student = studentProfileRepository
        .findByUserId(request.getUserId())
        .orElseThrow(() -> new RuntimeException("Student not found"));

        System.out.println("Student Profile ID = " + student.getId());
System.out.println("Internship ID = " + request.getInternshipId());

boolean alreadyApplied =
        applicationRepository.existsByStudentIdAndInternshipId(
                student.getId(),
                request.getInternshipId());

System.out.println("Already Applied = " + alreadyApplied);

if (alreadyApplied) {

    throw new ResponseStatusException(
            HttpStatus.CONFLICT,
            "You have already applied for this internship."
    );
}

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

    public List<Application> getUserApplications(Long userId) {

    StudentProfile student = studentProfileRepository
            .findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    return applicationRepository.findByStudentId(student.getId());

}

    public List<Application> getAllApplications() {

        return applicationRepository.findAllByOrderByAppliedAtDesc();

    }

    public Application updateStatus(Long id, ApplicationStatus status) {

    Application application = applicationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Application not found"));

    application.setStatus(status);

    Application savedApplication = applicationRepository.save(application);

    if (status != ApplicationStatus.PENDING) {

        NotificationRequest notification = new NotificationRequest();

        notification.setStudentId(application.getStudent().getId());

        notification.setType("APPLICATION");

        switch (status) {

            case SHORTLISTED:

                notification.setTitle("Application Shortlisted");

                notification.setMessage(
                        "Congratulations! You have been shortlisted for "
                                + application.getInternship().getTitle()
                                + " at "
                                + application.getInternship().getCompanyName()
                                + "."
                );

                break;

            case ACCEPTED:

                notification.setTitle("Application Accepted");

                notification.setMessage(
                        "Congratulations! Your application for "
                                + application.getInternship().getTitle()
                                + " at "
                                + application.getInternship().getCompanyName()
                                + " has been accepted."
                );

                break;

            case REJECTED:

                notification.setTitle("Application Rejected");

                notification.setMessage(
                        "Your application for "
                                + application.getInternship().getTitle()
                                + " at "
                                + application.getInternship().getCompanyName()
                                + " was not selected."
                );

                break;

            default:
                break;

        }

        notificationService.create(notification);

    }

    return savedApplication;

}

    public ApplicationSummaryResponse getSummary(Long userId) {

    StudentProfile student = studentProfileRepository
            .findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    Long studentId = student.getId();

    return new ApplicationSummaryResponse(

            applicationRepository.countByStudentId(studentId),

            applicationRepository.countByStudentIdAndStatus(
                    studentId,
                    ApplicationStatus.PENDING
            ),

            applicationRepository.countByStudentIdAndStatus(
                    studentId,
                    ApplicationStatus.SHORTLISTED
            ),

            applicationRepository.countByStudentIdAndStatus(
                    studentId,
                    ApplicationStatus.ACCEPTED
            )

    );

}
}