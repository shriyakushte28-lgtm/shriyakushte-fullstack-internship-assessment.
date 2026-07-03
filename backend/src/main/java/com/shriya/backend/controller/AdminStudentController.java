package com.shriya.backend.controller;

import com.shriya.backend.dto.StudentSummaryResponse;
import com.shriya.backend.service.AdminStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/students")
@RequiredArgsConstructor
public class AdminStudentController {

    private final AdminStudentService adminStudentService;

    @GetMapping
    public List<StudentSummaryResponse> getStudents() {

        return adminStudentService.getAllStudents();

    }

    @GetMapping("/{id}")
    public StudentSummaryResponse getStudent(

            @PathVariable Long id

    ) {

        return adminStudentService.getStudent(id);

    }

}