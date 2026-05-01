package com.example.calorie_calculator.repository;


import com.example.calorie_calculator.domain.Meal;
import com.example.calorie_calculator.domain.MealIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

	Optional<Meal> findByIdAndDeletedIsFalse(Long id);

	@Query("SELECT m.id " +
			" FROM Meal m " +
			" WHERE m.user.id = :id ")
	List<Long> findAllIdsByUser(@Param("id") Long id);



}
