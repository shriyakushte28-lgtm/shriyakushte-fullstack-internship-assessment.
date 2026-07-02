package com.shriya.backend.controller;

import com.shriya.backend.dto.ChangePasswordRequest;
import com.shriya.backend.dto.UserResponse;
import com.shriya.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public UserResponse getUser(
            @PathVariable Long userId
    ) {

        return userService.getUser(userId);

    }

    @PutMapping("/{userId}/password")
    public String changePassword(
            @PathVariable Long userId,
            @RequestBody ChangePasswordRequest request
    ) {

        return userService.changePassword(userId, request);

    }

    @PutMapping("/{userId}")
public String updateUser(
        @PathVariable Long userId,
        @RequestBody UserResponse request
) {

    return userService.updateUser(userId, request);

}

}