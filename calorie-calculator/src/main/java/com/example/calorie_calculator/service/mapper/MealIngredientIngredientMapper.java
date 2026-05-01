package com.example.calorie_calculator.service.mapper;

import com.example.calorie_calculator.domain.Ingredient;
import com.example.calorie_calculator.service.dto.MealIngredientIngredientDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MealIngredientIngredientMapper extends EntityMapper<MealIngredientIngredientDto, Ingredient> {
	@Override
	@Mapping(source = "id", target = "ingredientId")
	MealIngredientIngredientDto toDto(Ingredient entity);

	@Override
	@InheritInverseConfiguration
	Ingredient toEntity(MealIngredientIngredientDto dto);
}
