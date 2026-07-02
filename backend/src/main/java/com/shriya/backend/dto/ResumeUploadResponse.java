package com.shriya.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResumeUploadResponse {

    private String fileName;

    private String fileUrl;

}