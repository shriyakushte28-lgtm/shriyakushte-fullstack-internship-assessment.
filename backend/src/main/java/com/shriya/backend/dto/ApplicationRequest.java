package com.shriya.backend.dto;

import lombok.Data;

@Data
public class ApplicationRequest {

    private Long studentId;

    private Long internshipId;

    private String coverLetter;

    private String resumeUrl;

}