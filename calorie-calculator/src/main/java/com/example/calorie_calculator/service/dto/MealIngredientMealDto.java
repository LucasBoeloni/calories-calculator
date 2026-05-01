package com.example.calorie_calculator.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealIngredientMealDto implements Serializable {

	private Long mealId;
	private Long userId;
	private String name;
	private List<MealIngredientIngredientDto> ingredients;

}
