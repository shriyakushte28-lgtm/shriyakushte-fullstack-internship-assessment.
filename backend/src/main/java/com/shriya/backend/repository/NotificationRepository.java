package com.shriya.backend.repository;

import com.shriya.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByStudentIdOrderByCreatedAtDesc(Long studentId);

    long countByStudentIdAndIsReadFalse(Long studentId);

    Optional<Notification> findById(Long id);

}