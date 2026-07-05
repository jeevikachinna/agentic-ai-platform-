package com.aiagent.platform.service;

import com.aiagent.platform.dto.ChatRequestDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatService {
    private final GeminiCompletionService geminiCompletionService;

    public ChatService(GeminiCompletionService geminiCompletionService) {
        this.geminiCompletionService = geminiCompletionService;
    }

    public Map<String, Object> processMessage(ChatRequestDTO request) {
        Map<String, Object> response = new HashMap<>();
        response.put("reply", geminiCompletionService.getCompletion(request.getMessage()));
        return response;
    }
}
