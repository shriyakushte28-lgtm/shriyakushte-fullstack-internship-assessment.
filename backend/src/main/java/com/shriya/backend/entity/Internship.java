package com.shriya.backend.entity;

import com.shriya.backend.enums.InternshipStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "internships")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "company_name")
    private String companyName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    @Column(name = "is_remote")
    private Boolean isRemote;

    private BigDecimal stipend;

    @Column(name = "duration_months")
    private Integer durationMonths;

    @Column(name = "skills_required", columnDefinition = "TEXT")
    private String skillsRequired;

    private Integer openings;

    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    private InternshipStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}