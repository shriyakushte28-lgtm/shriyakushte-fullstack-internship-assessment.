package com.shriya.backend.controller;

import com.shriya.backend.dto.NotificationRequest;
import com.shriya.backend.entity.Notification;
import com.shriya.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public Notification create(
            @RequestBody NotificationRequest request) {

        return notificationService.create(request);

    }

    @GetMapping("/user/{userId}")
    public List<Notification> getUserNotifications(
        @PathVariable Long userId) {

    return notificationService.getUserNotifications(userId);

}

    @GetMapping("/count/{userId}")
    public long unreadCount(
        @PathVariable Long userId) {

    return notificationService.unreadCount(userId);

}

@PutMapping("/{id}/read")
public void markAsRead(@PathVariable Long id) {

    notificationService.markAsRead(id);

}

}