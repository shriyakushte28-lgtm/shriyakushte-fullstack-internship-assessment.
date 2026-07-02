package com.shriya.backend.dto;

import com.shriya.backend.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {

    private Long id;

    private String fullName;

    private String email;

    private Role role;

    private LocalDateTime createdAt;

}