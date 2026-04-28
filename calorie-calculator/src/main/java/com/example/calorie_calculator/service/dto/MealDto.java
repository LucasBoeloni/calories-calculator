package com.example.calorie_calculator.service.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealDto implements Serializable {

	private Long id;

	private Long userId;

	private Double calorie;

	private Boolean deleted = Boolean.FALSE;


}
