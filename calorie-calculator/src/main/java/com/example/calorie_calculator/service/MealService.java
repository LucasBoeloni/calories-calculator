package com.example.calorie_calculator.service;

import com.example.calorie_calculator.domain.Ingredient;
import com.example.calorie_calculator.domain.Meal;
import com.example.calorie_calculator.domain.MealIngredient;
import com.example.calorie_calculator.domain.User;
import com.example.calorie_calculator.repository.MealIngredientRepository;
import com.example.calorie_calculator.repository.MealRepository;
import com.example.calorie_calculator.service.dto.MealDto;
import com.example.calorie_calculator.service.dto.MealIngredientIngredientDto;
import com.example.calorie_calculator.service.dto.MealIngredientMealDto;
import com.example.calorie_calculator.service.mapper.MealIngredientIngredientMapper;
import com.example.calorie_calculator.service.mapper.MealIngredientMealMapper;
import com.example.calorie_calculator.service.mapper.MealMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class MealService {

	private final MealRepository repository;
	private final MealIngredientRepository mealIngredientRepository;

	private final MealMapper mapper;
	private final MealIngredientMealMapper mealIngredientMealMapper;
	private final MealIngredientIngredientMapper mealIngredientIngredientMapper;


	public List<MealIngredientMealDto> findAllMealIngredientFromUser(Long userId) {
		List<Long> meals = repository.findAllIdsByUser(userId);
		List<MealIngredient> mealIngredients = mealIngredientRepository.findAllByMealIdIn(meals);

		Map<Long, MealIngredientMealDto> map = new LinkedHashMap<>();

		for (MealIngredient mealIngredient : mealIngredients) {
			Meal meal = mealIngredient.getMeal();
			Long mealId = meal.getId();

			MealIngredientMealDto mealDto = map.computeIfAbsent(mealId, id -> {
				MealIngredientMealDto dto = new MealIngredientMealDto();
				dto.setMealId(id);
				dto.setUserId(userId);
				dto.setName(meal.getName());
				dto.setIngredients(new ArrayList<>());
				return dto;
			});

			MealIngredientIngredientDto ingredientDto = mealIngredientIngredientMapper.toDto(mealIngredient.getIngredient());
			ingredientDto.setMealId(mealId);
			ingredientDto.setUnit(mealIngredient.getUnit());
			ingredientDto.setQuantity(mealIngredient.getQuantity());

			mealDto.getIngredients().add(ingredientDto);
		}

		return new ArrayList<>(map.values());
	}

	public MealDto findById(Long id){
		return mapper.toDto(findEntityById(id));
	}

	private Meal findEntityById(Long id) {
		return repository.findByIdAndDeletedIsFalse(id)
				.orElseThrow(() -> new EntityNotFoundException("not found"));
	}

	@Transactional
	public MealIngredientMealDto save(MealIngredientMealDto dto) {
		Meal entity = mealIngredientMealMapper.toEntity(dto);
		Meal savedEntity = repository.saveAndFlush(entity);
		Long savedId = savedEntity.getId();
		List<MealIngredient> mealIngredients = new ArrayList<>();
		dto.getIngredients().forEach(ingredient -> {
			mealIngredients.add(new MealIngredient(savedId, ingredient.getIngredientId(),ingredient.getQuantity(), ingredient.getUnit()));
		});
		mealIngredientRepository.deleteAllByMealId(savedId);
		mealIngredientRepository.saveAll(mealIngredients);
		dto.setMealId(savedId);
		return dto;
	}

	@Transactional
	public void deleteById(Long id) {
		Meal entity = findEntityById(id);
		entity.setDeleted(Boolean.TRUE);
		repository.save(entity);
	}

}
