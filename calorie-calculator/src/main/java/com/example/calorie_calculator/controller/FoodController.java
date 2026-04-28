package com.example.calorie_calculator.controller;


import com.example.calorie_calculator.service.FoodService;
import com.example.calorie_calculator.service.dto.FoodDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@RequiredArgsConstructor
public class FoodController {

	private final FoodService service;

	@GetMapping
	public ResponseEntity<List<FoodDto>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<FoodDto> findById(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PostMapping
	public ResponseEntity<FoodDto> create(@RequestBody FoodDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
	}
	
	@PutMapping
	public ResponseEntity<FoodDto> update(@RequestBody FoodDto dto) {
		return ResponseEntity.ok(service.update(dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
