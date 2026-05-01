package com.example.calorie_calculator.repository;


import com.example.calorie_calculator.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

	Optional<Ingredient> findByIdAndDeletedIsFalse(Long id);

	List<Ingredient> findAllByDeletedIsFalseOrderByIdDesc();



}
