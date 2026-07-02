package com.shriya.backend.service;

import com.shriya.backend.dto.NotificationRequest;
import com.shriya.backend.entity.Notification;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.repository.NotificationRepository;
import com.shriya.backend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final StudentProfileRepository studentProfileRepository;

    public Notification create(NotificationRequest request) {

        StudentProfile student = studentProfileRepository.findById(
                request.getStudentId())
                .orElseThrow();

        Notification notification = Notification.builder()
                .student(student)
                .title(request.getTitle())
                .message(request.getMessage())
                .type(request.getType())
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        return notificationRepository.save(notification);

    }

    public List<Notification> getUserNotifications(Long userId) {

    StudentProfile student = studentProfileRepository
            .findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student profile not found"));

    return notificationRepository
            .findByStudentIdOrderByCreatedAtDesc(student.getId());

}

    public long unreadCount(Long userId) {

    StudentProfile student = studentProfileRepository
            .findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student profile not found"));

    return notificationRepository
            .countByStudentIdAndIsReadFalse(student.getId());

}

public void markAsRead(Long notificationId) {

    Notification notification = notificationRepository
            .findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found"));

    notification.setRead(true);

    notificationRepository.save(notification);

}

}