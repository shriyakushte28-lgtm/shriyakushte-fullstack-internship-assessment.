package com.shriya.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortalSettingsRequest {

    private String portalName;

    private String supportEmail;

    private Integer maxApplications;

    private String internshipDuration;

    private Boolean emailNotifications;

    private Boolean registrationAlerts;

    private Boolean internshipAlerts;

    private Boolean weeklyReports;

    private Boolean darkMode;

    private Integer sessionTimeout;

}