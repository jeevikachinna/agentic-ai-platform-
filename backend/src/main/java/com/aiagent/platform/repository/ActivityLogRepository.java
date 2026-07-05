package com.aiagent.platform.repository;

import com.aiagent.platform.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    long countByType(String type);
}