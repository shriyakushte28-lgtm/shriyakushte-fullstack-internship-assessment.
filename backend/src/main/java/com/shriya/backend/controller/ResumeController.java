package com.shriya.backend.controller;

import com.shriya.backend.dto.ResumeUploadResponse;
import com.shriya.backend.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload/{userId}")
    public ResumeUploadResponse uploadResume(

            @PathVariable Long userId,

            @RequestParam("file") MultipartFile file

    ) throws Exception {

        return resumeService.uploadResume(userId, file);

    }

}