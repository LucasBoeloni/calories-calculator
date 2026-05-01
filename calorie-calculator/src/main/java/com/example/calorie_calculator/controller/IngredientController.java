package com.example.calorie_calculator.controller;


import com.example.calorie_calculator.service.IngredientService;
import com.example.calorie_calculator.service.dto.IngredientDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient")
@RequiredArgsConstructor
public class IngredientController {

	private final IngredientService service;

	@GetMapping
	public ResponseEntity<List<IngredientDto>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<IngredientDto> findById(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PostMapping
	public ResponseEntity<IngredientDto> create(@RequestBody IngredientDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
