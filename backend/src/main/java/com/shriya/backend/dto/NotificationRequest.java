package com.shriya.backend.dto;

import lombok.Data;

@Data
public class NotificationRequest {

    private Long studentId;

    private String title;

    private String message;

    private String type;

}