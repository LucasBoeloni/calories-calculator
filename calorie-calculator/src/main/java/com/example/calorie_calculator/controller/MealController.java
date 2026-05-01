package com.example.calorie_calculator.controller;


import com.example.calorie_calculator.service.MealService;
import com.example.calorie_calculator.service.dto.MealDto;
import com.example.calorie_calculator.service.dto.MealIngredientMealDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/meal")
@RequiredArgsConstructor
public class MealController {

	private final MealService service;

	@GetMapping("/from-user/{userId}")
	public ResponseEntity<List<MealIngredientMealDto>> findAllMealIngredientFromUser(@PathVariable Long userId) {
		return ResponseEntity.ok(service.findAllMealIngredientFromUser(userId));
	}

	@GetMapping("/{id}")
	public ResponseEntity<MealDto> findById(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PostMapping
	public ResponseEntity<MealIngredientMealDto> create(@RequestBody MealIngredientMealDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
