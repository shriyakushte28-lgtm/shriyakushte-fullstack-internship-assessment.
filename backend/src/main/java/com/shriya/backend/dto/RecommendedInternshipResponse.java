package com.shriya.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class RecommendedInternshipResponse {

    private Long id;

    private String title;

    private String companyName;

    private String location;

    private BigDecimal stipend;

    private Integer matchPercentage;

    private List<String> matchedSkills;

}