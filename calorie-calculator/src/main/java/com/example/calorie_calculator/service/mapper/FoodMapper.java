package com.example.calorie_calculator.service.mapper;

import com.example.calorie_calculator.domain.Food;
import com.example.calorie_calculator.service.dto.FoodDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FoodMapper extends EntityMapper<FoodDto, Food> {

}
