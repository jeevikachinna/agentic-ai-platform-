package com.aiagent.platform.service;

import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

public class GeminiCompletionServiceImpl implements GeminiCompletionService {
    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String model;

    private static final int MAX_RETRIES = 3;
    private static final long INITIAL_DELAY_MS = 2000;

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

        String url = UriComponentsBuilder
                .fromHttpUrl("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent")
                .queryParam("key", apiKey)
                .toUriString();

        Map<String, Object> payload = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", message))))
        );

        long delay = INITIAL_DELAY_MS;

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                Map<String, Object> response = restTemplate.postForObject(url, payload, Map.class);
                return extractText(response);

            } catch (HttpServerErrorException.ServiceUnavailable ex) {
                // 503 - Gemini is overloaded, retry after a delay
                System.err.println("Attempt " + attempt + " failed: Gemini 503 Service Unavailable.");

                if (attempt == MAX_RETRIES) {
                    return "The AI service is currently experiencing high demand. Please try again in a moment.";
                }

                try {
                    Thread.sleep(delay);
                } catch (InterruptedException interruptedEx) {
                    Thread.currentThread().interrupt();
                    return "Request was interrupted. Please try again.";
                }

                delay *= 2; // exponential backoff: 2s, 4s, 8s...

            } catch (Exception ex) {
                String errorMessage = "Gemini request failed: " + ex.getMessage();
                System.err.println(errorMessage);
                ex.printStackTrace();
                return "Something went wrong while contacting the AI service. Please try again.";
            }
        }

        return "Unable to reach the AI service. Please try again later.";
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