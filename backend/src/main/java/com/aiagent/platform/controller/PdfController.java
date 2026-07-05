package com.aiagent.platform.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aiagent.platform.service.AiAgentService;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {
    private final AiAgentService aiAgentService;

    public PdfController(AiAgentService aiAgentService) {
        this.aiAgentService = aiAgentService;
    }

    @PostMapping("/summarize")
    public ResponseEntity<String> summarize(@RequestBody Map<String, String> request) {
        try {
            String text = request.getOrDefault("text", "");
            String summaryType = request.getOrDefault("summaryType", "short");
            return ResponseEntity.ok(aiAgentService.summarizeText(text, summaryType));
        } catch (RuntimeException ex) {
            return ResponseEntity.internalServerError().body("Error: " + ex.getMessage());
        }
    }
}