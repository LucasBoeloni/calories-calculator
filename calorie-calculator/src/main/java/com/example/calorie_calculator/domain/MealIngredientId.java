package com.example.calorie_calculator.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealIngredientId implements Serializable {

	@Column(name = "id_meal")
	private Long mealId;

	@Column(name = "id_ingredient")
	private Long ingredientId;
}
