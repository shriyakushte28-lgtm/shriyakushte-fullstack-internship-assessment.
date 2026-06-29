package com.shriya.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class InternshipRequest {

    private String title;
    private String companyName;
    private String description;
    private String location;
    private Boolean isRemote;
    private BigDecimal stipend;
    private Integer durationMonths;
    private String skillsRequired;
    private Integer openings;
    private LocalDate deadline;
}
