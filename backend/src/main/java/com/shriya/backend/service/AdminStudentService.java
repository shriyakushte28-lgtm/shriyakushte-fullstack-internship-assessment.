package com.shriya.backend.service;

import com.shriya.backend.dto.StudentSummaryResponse;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.repository.ApplicationRepository;
import com.shriya.backend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStudentService {

    private final StudentProfileRepository studentRepository;

    private final ApplicationRepository applicationRepository;

    public List<StudentSummaryResponse> getAllStudents() {

        return studentRepository.findAll()

                .stream()

                .map(student -> StudentSummaryResponse.builder()

                        .id(student.getId())

                        .fullName(student.getFullName())

                        .email(student.getUser().getEmail())

                        .phone(student.getPhone())

                        .college(student.getCollege())

                        .degree(student.getDegree())

                        .graduationYear(student.getGraduationYear())

                        .skills(student.getSkills())

                        .bio(student.getBio())

                        .resumeUrl(student.getResumeUrl())

                        .applicationCount(

                                applicationRepository.countByStudentId(

                                        student.getId()

                                )

                        )

                        .build()

                )

                .toList();

    }

    public StudentSummaryResponse getStudent(Long id) {

        StudentProfile student = studentRepository.findById(id)

                .orElseThrow(() ->

                        new RuntimeException("Student not found"));

        return StudentSummaryResponse.builder()

                .id(student.getId())

                .fullName(student.getFullName())

                .email(student.getUser().getEmail())

                .phone(student.getPhone())

                .college(student.getCollege())

                .degree(student.getDegree())

                .graduationYear(student.getGraduationYear())

                .skills(student.getSkills())

                .bio(student.getBio())

                .resumeUrl(student.getResumeUrl())

                .applicationCount(

                        applicationRepository.countByStudentId(

                                student.getId()

                        )

                )

                .build();

    }

}