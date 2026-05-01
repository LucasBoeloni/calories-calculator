package com.example.calorie_calculator.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UnitEnum {
	UNIDADE(1,"u"),
	GRAMAS(2, "g");

	private final int id;
	private final String label;
}
