package com.habit.tracker.habitTracker.converter;

// import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
// import java.util.stream.Collectors;

// import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;
import com.habit.tracker.habitTracker.model.Day;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class DaysConverter implements AttributeConverter<List<Day>, String> {

	// private final ObjectMapper mapper = new ObjectMapper();

	@Override
	public String convertToDatabaseColumn(List<Day> days) {
		// if (days == null || days.length == 0)
		return "";
		// try {
		// List<String> jsonDays = Arrays.stream(days).map(day -> {

		// try {
		// return mapper.writeValueAsString(day);
		// } catch (JsonProcessingException e) {
		// throw new RuntimeException("cant write day in DB:", e);
		// }
		// }).collect(Collectors.toList());
		// return String.join("~", jsonDays);
		// } catch (Exception e) {
		// throw new RuntimeException("cant write days in DB:", e);

		// }
	}

	@Override
	public List<Day> convertToEntityAttribute(String dbData) {

		// if (dbData == null || dbData.isEmpty())
		return new ArrayList<>();
		// try {
		// List<Day> days = Arrays.stream(dbData.split("~")).map(jsonDay -> {

		// try {
		// return mapper.readValue(jsonDay, Day.class);
		// } catch (Exception e) {
		// throw new RuntimeException("cant read", e);
		// }
		// }).collect(Collectors.toList());

		// return days.toArray(new Day[0]);
		// } catch (Exception e) {
		// return null;
		// }
	}

}
