package com.shriya.backend.service;

import com.shriya.backend.dto.ResumeUploadResponse;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final StudentProfileRepository studentProfileRepository;

    private final String UPLOAD_DIR = "uploads/resumes/";

    public ResumeUploadResponse uploadResume(Long userId, MultipartFile file)
            throws IOException {

        StudentProfile student = studentProfileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (file.isEmpty()) {
            throw new RuntimeException("Please select a file.");
        }

        if (!file.getOriginalFilename().toLowerCase().endsWith(".pdf")) {
            throw new RuntimeException("Only PDF resumes are allowed.");
        }

        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String fileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path path = Paths.get(UPLOAD_DIR + fileName);

        Files.copy(
                file.getInputStream(),
                path,
                StandardCopyOption.REPLACE_EXISTING
        );

        student.setResumeUrl("/uploads/resumes/" + fileName);

        studentProfileRepository.save(student);

        return new ResumeUploadResponse(

                fileName,

                "/uploads/resumes/" + fileName

        );

    }

}