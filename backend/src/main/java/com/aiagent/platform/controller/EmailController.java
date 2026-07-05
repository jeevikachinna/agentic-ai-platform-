package com.aiagent.platform.controller;

import com.aiagent.platform.service.AiAgentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    private final AiAgentService aiAgentService;

    public EmailController(AiAgentService aiAgentService) {
        this.aiAgentService = aiAgentService;
    }

    @PostMapping("/draft")
    public ResponseEntity<?> draft() {
        return ResponseEntity.ok(aiAgentService.generateEmailDraft());
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generate(@RequestBody Map<String, String> request) {
        try {
            String subject = request.getOrDefault("subject", "");
            String tone = request.getOrDefault("tone", "professional");
            String topic = request.getOrDefault("topic", "");
            return ResponseEntity.ok(aiAgentService.generateEmailFromPrompt(subject, topic, tone));
        } catch (RuntimeException ex) {
            return ResponseEntity.internalServerError().body(Map.of("error", ex.getMessage()));
        }
    }
}
