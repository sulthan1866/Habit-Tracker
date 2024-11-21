package com.habit.tracker.habitTracker.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.habit.tracker.habitTracker.model.Day;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class DaysConverter implements AttributeConverter<Day[],String>{
	
	private final ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public String convertToDatabaseColumn(Day[] days) {
		try {
			return mapper.writeValueAsString(days);
		}
		catch(JsonProcessingException e) {
			throw new RuntimeException("cant add",e);
		}
		
	}

	@Override
	public Day[] convertToEntityAttribute(String dbData) {
		
		try {
			return mapper.readValue(dbData, Day[].class);
		}catch(Exception e){
			throw new RuntimeException("error",e);
		}
	}

}
