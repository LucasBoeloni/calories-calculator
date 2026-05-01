package com.example.calorie_calculator.service.mapper;

import com.example.calorie_calculator.domain.Meal;
import com.example.calorie_calculator.service.dto.MealIngredientMealDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MealIngredientMealMapper extends EntityMapper<MealIngredientMealDto, Meal> {

	@Override
	@Mapping(source = "id", target = "mealId")
	@Mapping(source = "user.id", target = "userId")
	MealIngredientMealDto toDto(Meal entity);

	@Override
	@InheritInverseConfiguration
	Meal toEntity(MealIngredientMealDto dto);
}
