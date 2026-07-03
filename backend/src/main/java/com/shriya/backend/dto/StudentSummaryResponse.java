package com.shriya.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentSummaryResponse {

    private Long id;

    private String fullName;

    private String email;

    private String phone;

    private String college;

    private String degree;

    private Integer graduationYear;

    private String skills;

    private String bio;

    private String resumeUrl;

    private long applicationCount;

}