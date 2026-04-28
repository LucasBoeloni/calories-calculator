package com.example.calorie_calculator.service.mapper;

import com.example.calorie_calculator.domain.Meal;
import com.example.calorie_calculator.service.dto.MealDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MealMapper extends EntityMapper<MealDto, Meal> {

}
