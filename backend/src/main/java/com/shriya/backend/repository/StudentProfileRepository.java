package com.shriya.backend.repository;

import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {

    Optional<StudentProfile> findByUser(User user);

    boolean existsByUser(User user);

    Optional<StudentProfile> findByUserId(Long userId);

    Optional<StudentProfile> findById(Long id);
}
