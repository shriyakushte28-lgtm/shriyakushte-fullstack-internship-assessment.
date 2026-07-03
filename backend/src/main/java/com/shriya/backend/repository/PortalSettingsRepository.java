package com.shriya.backend.repository;

import com.shriya.backend.entity.PortalSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortalSettingsRepository
        extends JpaRepository<PortalSettings, Long> {
}