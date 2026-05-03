package com.example.calorie_calculator.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "meal_ingredient")
@Getter
@Setter
@NoArgsConstructor
public class MealIngredient implements Serializable {


	@EmbeddedId
	private MealIngredientId id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("mealId")
	@JoinColumn(name = "id_meal")
	private Meal meal;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("ingredientId")
	@JoinColumn(name = "id_ingredient")
	private Ingredient ingredient;

	@Column(name = "quantity")
	private Double quantity;

	public MealIngredient(Long mealId, Long ingredientId, Double quantity){
		this.id = new MealIngredientId(mealId, ingredientId);
		Meal meal =new Meal();
		meal.setId(mealId);
		this.meal = meal;
		Ingredient ingredient =new Ingredient();
		ingredient.setId(ingredientId);
		this.ingredient = ingredient;
		this.quantity = quantity;
	}



}
