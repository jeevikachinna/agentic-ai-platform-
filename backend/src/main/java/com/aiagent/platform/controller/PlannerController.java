package com.aiagent.platform.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aiagent.platform.service.AiAgentService;

@RestController
@RequestMapping("/api/planner")
public class PlannerController {
    private final AiAgentService aiAgentService;

    public PlannerController(AiAgentService aiAgentService) {
        this.aiAgentService = aiAgentService;
    }

    @GetMapping("/tasks")
    public ResponseEntity<?> tasks() {
        return ResponseEntity.ok(aiAgentService.planTasks());
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generate(@RequestBody Map<String, String> request) {
        try {
            String goal = request.getOrDefault("goal", "");
            String timeframe = request.getOrDefault("timeframe", "this week");
            return ResponseEntity.ok(aiAgentService.generatePlan(goal, timeframe));
        } catch (RuntimeException ex) {
            return ResponseEntity.internalServerError().body("Error: " + ex.getMessage());
        }
    }
}