package com.example.calorie_calculator.repository;


import com.example.calorie_calculator.domain.MealIngredient;
import com.example.calorie_calculator.domain.MealIngredientId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealIngredientRepository extends JpaRepository<MealIngredient, MealIngredientId> {

	@Query("SELECT mf " +
			" FROM MealIngredient mf " +
			" WHERE mf.meal.id in :mealId ")
	List<MealIngredient> findAllByMealIdIn(@Param("mealId") List<Long> mealId);

	@Modifying
	@Query("DELETE " +
			" FROM MealIngredient mf " +
			" WHERE mf.meal.id = :mealId ")
	void deleteAllByMealId(@Param("mealId") Long mealId);



}
