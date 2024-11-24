package com.habit.tracker.habitTracker.converter;

import java.util.Map;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class BadgesConverter implements AttributeConverter<Map<String, Map<String, Integer>>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, Map<String, Integer>> badges) {
        if (badges == null || badges.isEmpty()) {
            return null;
        }

        try {
            return mapper.writeValueAsString(badges);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize badges to JSON", e);
        }
    }

    @Override
    public Map<String, Map<String, Integer>> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return new HashMap<>();
        }

        try {
            return mapper.readValue(dbData, new TypeReference<Map<String, Map<String, Integer>>>() {
            });
        } catch (Exception e) {
            throw new RuntimeException("Failed to deserialize badges from JSON", e);
        }
    }
}
