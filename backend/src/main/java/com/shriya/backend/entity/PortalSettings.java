package com.shriya.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "portal_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortalSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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