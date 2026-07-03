package com.shriya.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
public class AdminAnalyticsResponse {

    private Map<String, Long> statusChart;

    private Map<String, Long> monthlyApplications;

    private String mostAppliedInternship;

    private double averageApplications;

    private long pendingReviews;

    private double acceptanceRate;

}