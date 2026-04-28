package com.example.calorie_calculator.service.mapper;

import com.example.calorie_calculator.domain.Food;
import com.example.calorie_calculator.domain.User;
import com.example.calorie_calculator.service.dto.FoodDto;
import com.example.calorie_calculator.service.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends EntityMapper<UserDto, User> {

}
