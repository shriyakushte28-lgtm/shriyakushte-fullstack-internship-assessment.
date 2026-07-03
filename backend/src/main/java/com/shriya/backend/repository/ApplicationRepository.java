package com.shriya.backend.repository;

import com.shriya.backend.entity.Application;
import com.shriya.backend.enums.ApplicationStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);

    boolean existsByStudentIdAndInternshipId(Long studentId, Long internshipId);

    List<Application> findAllByOrderByAppliedAtDesc();

    long countByStudentId(Long studentId);

    long countByStudentIdAndStatus(Long studentId, ApplicationStatus status);

    List<Application> findTop5ByOrderByAppliedAtDesc();

}