package com.shriya.backend.repository;

import com.shriya.backend.entity.SavedInternship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedInternshipRepository
        extends JpaRepository<SavedInternship, Long> {

    List<SavedInternship> findByStudentId(Long studentId);

    boolean existsByStudentIdAndInternshipId(
            Long studentId,
            Long internshipId
    );

    Optional<SavedInternship> findByStudentIdAndInternshipId(
            Long studentId,
            Long internshipId
    );

}