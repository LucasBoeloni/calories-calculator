package com.example.calorie_calculator.repository;


import com.example.calorie_calculator.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

	Optional<Food> findByIdAndDeletedIsFalse(Long id);

	List<Food> findAllByDeletedIsFalse();



}
