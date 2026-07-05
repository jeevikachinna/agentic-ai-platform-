package com.aiagent.platform.service;

import com.aiagent.platform.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    public Map<String, Object> register(UserDTO request) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", Map.of("email", request.getEmail(), "name", request.getName()));
        return response;
    }

    public Map<String, Object> login(UserDTO request) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", "demo-jwt-token");
        response.put("user", Map.of("email", request.getEmail(), "name", request.getName()));
        return response;
    }
}
