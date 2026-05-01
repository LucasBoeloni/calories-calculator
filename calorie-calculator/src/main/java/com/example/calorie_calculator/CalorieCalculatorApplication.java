package com.example.calorie_calculator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CalorieCalculatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(CalorieCalculatorApplication.class, args);
	}

}
