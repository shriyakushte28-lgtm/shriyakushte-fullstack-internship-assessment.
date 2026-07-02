package com.shriya.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentSummaryResponse {

    private Long id;

    private Long userId;

    private String fullName;

    private String email;

    private String college;

    private String degree;

}