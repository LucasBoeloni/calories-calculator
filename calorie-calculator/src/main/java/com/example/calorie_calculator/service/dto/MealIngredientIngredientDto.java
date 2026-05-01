package com.example.calorie_calculator.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealIngredientIngredientDto implements Serializable {

	private Long mealId;

	private Long ingredientId;

	private Double quantity;

	private int unit;

	private String name;

	private Double calorie;

	private Double carbohydrate;

	private Double sugar;

	private Double protein;

	private Double fat;

	private Double fiber;

	private Double sodium;

}
