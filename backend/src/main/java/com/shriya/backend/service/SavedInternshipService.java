package com.shriya.backend.service;

import com.shriya.backend.dto.SavedInternshipRequest;
import com.shriya.backend.entity.Internship;
import com.shriya.backend.entity.SavedInternship;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.repository.InternshipRepository;
import com.shriya.backend.repository.SavedInternshipRepository;
import com.shriya.backend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedInternshipService {

    private final SavedInternshipRepository savedRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final InternshipRepository internshipRepository;

    public SavedInternship saveInternship(SavedInternshipRequest request) {

        StudentProfile student = studentProfileRepository
                .findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (savedRepository.existsByStudentIdAndInternshipId(
                student.getId(),
                request.getInternshipId())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Internship already saved."
            );

        }

        Internship internship = internshipRepository.findById(
                request.getInternshipId())
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        SavedInternship saved = SavedInternship.builder()
                .student(student)
                .internship(internship)
                .savedAt(LocalDateTime.now())
                .build();

        return savedRepository.save(saved);

    }

    public List<SavedInternship> getSavedInternships(Long userId) {

        StudentProfile student = studentProfileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return savedRepository.findByStudentId(student.getId());

    }

    public void removeSavedInternship(Long userId, Long internshipId) {

        StudentProfile student = studentProfileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        SavedInternship saved = savedRepository
                .findByStudentIdAndInternshipId(
                        student.getId(),
                        internshipId)
                .orElseThrow(() -> new RuntimeException("Saved internship not found"));

        savedRepository.delete(saved);

    }

    public boolean isSaved(Long userId, Long internshipId) {

        StudentProfile student = studentProfileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return savedRepository.existsByStudentIdAndInternshipId(
                student.getId(),
                internshipId);

    }

}