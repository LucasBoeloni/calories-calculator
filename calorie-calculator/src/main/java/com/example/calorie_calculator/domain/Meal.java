package com.example.calorie_calculator.domain;

import com.example.calorie_calculator.service.dto.IngredientDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "meal")
@Getter
@Setter
@NoArgsConstructor
public class Meal implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_meal")
	@SequenceGenerator(name = "sequence_meal", sequenceName = "sequence_meal", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_user", referencedColumnName = "id", nullable = false)
	private User user;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "meal")
	private List<MealIngredient> ingredients;

	@Column(name = "name")
	private String name;

	@Column(name = "deleted", nullable = false)
	private Boolean deleted = Boolean.FALSE;


}
