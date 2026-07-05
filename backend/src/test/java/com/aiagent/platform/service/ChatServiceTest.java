package com.aiagent.platform.service;

import com.aiagent.platform.dto.ChatRequestDTO;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ChatServiceTest {

    @Test
    void processMessageReturnsGeminiReply() {
        GeminiCompletionService geminiCompletionService = new GeminiCompletionService() {
            @Override
            public String getCompletion(String message) {
                return "Gemini reply";
            }
        };

        ChatService chatService = new ChatService(geminiCompletionService);
        ChatRequestDTO request = new ChatRequestDTO();
        request.setMessage("Hello");

        Map<String, Object> response = chatService.processMessage(request);
        assertEquals("Gemini reply", response.get("reply"));
    }
}
