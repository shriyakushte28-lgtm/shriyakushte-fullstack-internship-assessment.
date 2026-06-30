package com.shriya.backend.repository;

import com.shriya.backend.entity.Internship;
import com.shriya.backend.enums.InternshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {

    List<Internship> findByStatus(InternshipStatus status);

    List<Internship> findByLocationContainingIgnoreCase(String location);

    List<Internship> findByTitleContainingIgnoreCase(String title);

    List<Internship> findByIsRemote(Boolean isRemote);

    List<Internship> findTop6ByOrderByCreatedAtDesc();

    long countByStatus(InternshipStatus status);
}