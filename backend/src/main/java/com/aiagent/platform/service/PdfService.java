package com.aiagent.platform.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PdfService {
    public Map<String, Object> extractText() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "PDF extraction endpoint ready");
        response.put("text", "Demo PDF text");
        return response;
    }
}
