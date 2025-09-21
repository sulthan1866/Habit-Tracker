package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class AiService {
    private final WebClient webClient;

    @Value("${deepai.api.key}")
    private String aiApiKey;

    public AiService(WebClient.Builder webClientBuilder) {
        System.out.println("api = " + aiApiKey);

        this.webClient = webClientBuilder
                // .baseUrl("https://api-inference.huggingface.co/models/defog/sqlcoder-7b-2")
                // .baseUrl("https://api.edenai.run/v2/text/chat")
                .baseUrl(
                        "https://api.shecodes.io/ai/v1/generate?context=sql-query-generater&key=b58bbb4t1103db3dc6e99f919a41e51o")
                .build();
    }

    public String getText(String prompt) {
        // return webClient.post()
        // // .header("accept", "application/json")
        // .header("Content-Type", "application/json")
        // .header("Authorization", "Bearer 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")
        // // .header("authorization",
        // // "Bearer
        // //
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjI5NmY3ZmYtMWMxOS00YmI4LTk4YjctMmI0ZjA0ODE1M2Q1IiwidHlwZSI6ImFwaV90b2tlbiJ9.6g0jGoqTJc1EOi6poTaL3qLKYDZ90CH_s0Nrlh01buw")
        // .bodyValue("{\"inputs\": \"" + prompt + "\"}")
        // //
        // "{\"response_as_dict\":true,\"attributes_as_list\":false,\"show_base_64\":true,\"show_original_response\":false,\"temperature\":0,\"tool_choice\":\"auto\",\"providers\":[\"openai\"],\"text\":\""
        // // + prompt + "\"}")

        // .retrieve()
        // .bodyToMono(String.class)
        // .block();
        return webClient.get()
        .uri(UriBuilder -> UriBuilder.queryParam("prompt", prompt).build())
                .retrieve()
                .bodyToMono(String.class)
                .onErrorResume(e -> Mono.empty())
                .block();
    }
}
