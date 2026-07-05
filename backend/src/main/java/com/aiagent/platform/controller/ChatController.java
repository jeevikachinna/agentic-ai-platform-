package com.aiagent.platform.controller;

import com.aiagent.platform.dto.ChatRequestDTO;
import com.aiagent.platform.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/message")
    public ResponseEntity<?> chat(@RequestBody ChatRequestDTO request) {
        return ResponseEntity.ok(chatService.processMessage(request));
    }
}
