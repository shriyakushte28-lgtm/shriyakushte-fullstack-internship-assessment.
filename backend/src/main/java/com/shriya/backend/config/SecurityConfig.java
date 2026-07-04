package com.shriya.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/profile/**").permitAll()
                        .requestMatchers("/api/internships/**").permitAll()
                        .requestMatchers("/api/applications/**").permitAll()
                        .requestMatchers("/api/admin/**").permitAll()
                        .requestMatchers("/api/notifications/**").permitAll()
                        .requestMatchers("/api/users/**").permitAll()
                        .requestMatchers("/api/saved/**").permitAll()
                        .requestMatchers("/api/resume/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/api/test-email").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }
}