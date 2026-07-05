package com.aiagent.platform.config;

import com.aiagent.platform.service.GeminiCompletionService;
import com.aiagent.platform.service.GeminiCompletionServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiClientConfig {

    @Bean
    public GeminiCompletionService geminiCompletionService(
            @Value("${gemini.api.key:}") String apiKey,
            @Value("${gemini.model:gemini-flash-latest}") String model) {
        return new GeminiCompletionServiceImpl(apiKey, model);
    }
}
