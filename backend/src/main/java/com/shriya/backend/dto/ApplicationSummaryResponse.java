package com.shriya.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicationSummaryResponse {

    private long applied;
    private long pending;
    private long shortlisted;
    private long accepted;

}