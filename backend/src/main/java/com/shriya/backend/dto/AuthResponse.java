package com.shriya.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String message;

    private Long id;

    private String fullName;

    private String role;

}