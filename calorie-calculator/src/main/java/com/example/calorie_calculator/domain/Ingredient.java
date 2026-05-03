package com.example.calorie_calculator.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "ingredient")
@Getter
@Setter
@NoArgsConstructor
public class Ingredient implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_ingredient")
	@SequenceGenerator(name = "sequence_ingredient", sequenceName = "sequence_ingredient", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "unit")
	private Integer unit;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "calorie", nullable = false)
	private Double calorie;

	@Column(name = "carbohydrate", nullable = false)
	private Double carbohydrate;

	@Column(name = "sugar", nullable = false)
	private Double sugar;

	@Column(name = "protein", nullable = false)
	private Double protein;

	@Column(name = "fat", nullable = false)
	private Double fat;

	@Column(name = "fiber", nullable = false)
	private Double fiber;

	@Column(name = "sodium", nullable = false)
	private Double sodium;

	@Column(name = "deleted", nullable = false)
	private Boolean deleted = Boolean.FALSE;


}
