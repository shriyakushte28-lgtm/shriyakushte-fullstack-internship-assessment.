package com.shriya.backend.dto;

import com.shriya.backend.enums.Role;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AdminProfileResponse {

    private Long id;

    private String fullName;

    private String email;

    private Role role;

    private LocalDateTime createdAt;

}