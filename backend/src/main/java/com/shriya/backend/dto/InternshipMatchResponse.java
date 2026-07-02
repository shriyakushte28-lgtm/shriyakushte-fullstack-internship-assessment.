package com.shriya.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class InternshipMatchResponse {

    private Integer matchPercentage;

    private Integer matchedSkillCount;

    private Integer totalRequiredSkills;

    private List<String> matchedSkills;

    private List<String> missingSkills;

}