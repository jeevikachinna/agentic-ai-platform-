package com.aiagent.platform.service;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

public class GeminiCompletionServiceImpl implements GeminiCompletionService {
    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String model;

    public GeminiCompletionServiceImpl(String apiKey, String model) {
        this.restTemplate = new RestTemplate();
        this.apiKey = apiKey;
        this.model = model;
    }

    @Override
    public String getCompletion(String message) {
        if (message == null || message.isBlank()) {
            return "Please provide a message.";
        }

        if (apiKey == null || apiKey.isBlank() || model == null || model.isBlank()) {
            return "Gemini API key or model is not configured.";
        }

        try {
            String url = UriComponentsBuilder
                    .fromHttpUrl("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent")
                    .queryParam("key", apiKey)
                    .toUriString();

            Map<String, Object> payload = Map.of(
                    "contents", List.of(Map.of("parts", List.of(Map.of("text", message))))
            );

            Map<String, Object> response = restTemplate.postForObject(url, payload, Map.class);
            return extractText(response);
        } catch (Exception ex) {
            String errorMessage = "Gemini request failed: " + ex.getMessage();
            System.err.println(errorMessage);
            ex.printStackTrace();
            throw new RuntimeException(errorMessage, ex);
        }
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map<String, Object> response) {
        if (response == null) {
            return "Gemini did not return a response.";
        }

        Object candidates = response.get("candidates");
        if (candidates instanceof List<?> candidateList && !candidateList.isEmpty()) {
            Object firstCandidate = candidateList.get(0);
            if (firstCandidate instanceof Map<?, ?> candidateMap) {
                Object content = candidateMap.get("content");
                if (content instanceof Map<?, ?> contentMap) {
                    Object parts = contentMap.get("parts");
                    if (parts instanceof List<?> partList) {
                        for (Object part : partList) {
                            if (part instanceof Map<?, ?> partMap) {
                                Object text = partMap.get("text");
                                if (text instanceof String textValue && !textValue.isBlank()) {
                                    return textValue;
                                }
                            }
                        }
                    }
                }
            }
        }

        return "Gemini did not return a response.";
    }
}
