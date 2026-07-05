package com.aiagent.platform.controller;

import com.aiagent.platform.service.AiAgentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/translator")
public class TranslatorController {
    private final AiAgentService aiAgentService;

    public TranslatorController(AiAgentService aiAgentService) {
        this.aiAgentService = aiAgentService;
    }

    @PostMapping("/translate")
    public ResponseEntity<String> translate(@RequestBody Map<String, String> request) {
        try {
            String text = request.getOrDefault("text", "");
            String targetLanguage = request.getOrDefault("targetLanguage", "French");
            return ResponseEntity.ok(aiAgentService.translateText(text, targetLanguage));
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("Error: " + ex.getClass().getSimpleName() + " - " + ex.getMessage());
        }
    }
}