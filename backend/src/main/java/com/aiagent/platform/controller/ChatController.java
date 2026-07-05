package com.aiagent.platform.controller;

import com.aiagent.platform.dto.ChatRequestDTO;
import com.aiagent.platform.model.ActivityLog;
import com.aiagent.platform.repository.ActivityLogRepository;
import com.aiagent.platform.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;
    private final ActivityLogRepository activityLogRepository;

    public ChatController(ChatService chatService, ActivityLogRepository activityLogRepository) {
        this.chatService = chatService;
        this.activityLogRepository = activityLogRepository;
    }

    @PostMapping("/message")
    public ResponseEntity<?> chat(@RequestBody ChatRequestDTO request) {
        Object response = chatService.processMessage(request);
        activityLogRepository.save(new ActivityLog("CHAT", LocalDateTime.now()));
        return ResponseEntity.ok(response);
    }
}