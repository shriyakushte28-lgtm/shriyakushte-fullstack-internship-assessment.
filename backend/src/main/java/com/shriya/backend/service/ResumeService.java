package com.shriya.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.shriya.backend.dto.ResumeUploadResponse;
import com.shriya.backend.entity.StudentProfile;
import com.shriya.backend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final StudentProfileRepository studentProfileRepository;
    private final Cloudinary cloudinary;

    public ResumeUploadResponse uploadResume(
            Long userId,
            MultipartFile file
    ) throws IOException {

        StudentProfile student = studentProfileRepository
                .findByUserId(userId)
                .orElseThrow(
                        () -> new RuntimeException("Student not found")
                );


        // Check empty file
        if (file.isEmpty()) {
            throw new RuntimeException(
                    "Please select a file."
            );
        }


        // Check PDF type
        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null ||
                !originalFilename.toLowerCase().endsWith(".pdf")) {

            throw new RuntimeException(
                    "Only PDF resumes are allowed."
            );
        }


        // Generate unique public ID
        String publicId =
                "resume_" + userId + "_" + UUID.randomUUID();


        // Upload PDF to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "raw",
                        "folder", "internsphere/resumes",
                        "public_id", publicId
                )
        );


        // Get secure Cloudinary URL
        String resumeUrl =
                uploadResult.get("secure_url").toString();


        // Save URL in student profile
        student.setResumeUrl(resumeUrl);

        studentProfileRepository.save(student);


        return new ResumeUploadResponse(
                originalFilename,
                resumeUrl
        );
    }
}