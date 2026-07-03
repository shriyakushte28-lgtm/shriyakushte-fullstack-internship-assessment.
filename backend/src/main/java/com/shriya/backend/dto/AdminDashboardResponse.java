package com.shriya.backend.dto;

import com.shriya.backend.entity.Application;
import com.shriya.backend.entity.Internship;
import com.shriya.backend.entity.StudentProfile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class AdminDashboardResponse {

    private long students;

    private long internships;

    private long applications;

    private long openInternships;

    private List<Application> recentApplications;

    private List<StudentProfile> recentStudents;

    private List<Internship> latestInternships;

}