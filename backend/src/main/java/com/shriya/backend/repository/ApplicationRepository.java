package com.shriya.backend.repository;

import com.shriya.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);

    boolean existsByStudentIdAndInternshipId(Long studentId, Long internshipId);

}