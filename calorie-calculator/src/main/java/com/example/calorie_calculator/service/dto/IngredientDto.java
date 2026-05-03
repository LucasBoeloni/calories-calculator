package com.example.calorie_calculator.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IngredientDto implements Serializable {

	private Long id;

	private Integer unit;

	private String name;

	private Double calorie;

	private Double carbohydrate;

	private Double sugar;

	private Double protein;

	private Double fat;

	private Double fiber;

	private Double sodium;

	private Boolean deleted = Boolean.FALSE;


}
