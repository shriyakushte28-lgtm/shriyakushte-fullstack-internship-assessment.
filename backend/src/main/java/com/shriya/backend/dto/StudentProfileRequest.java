package com.shriya.backend.dto;

import lombok.Data;

@Data
public class StudentProfileRequest {

    private String fullName;
    private String phone;
    private String college;
    private String degree;
    private Integer graduationYear;
    private String skills;
    private String resumeUrl;
    private String bio;
}
