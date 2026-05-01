package com.example.calorie_calculator.service.mapper;

import com.example.calorie_calculator.domain.Ingredient;
import com.example.calorie_calculator.service.dto.IngredientDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IngredientMapper extends EntityMapper<IngredientDto, Ingredient> {

}
