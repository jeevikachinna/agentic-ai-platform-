package com.aiagent.platform.dto;

public class ChatResponseDTO {
    private final String reply;

    public ChatResponseDTO(String reply) {
        this.reply = reply;
    }

    public String getReply() {
        return reply;
    }
}
