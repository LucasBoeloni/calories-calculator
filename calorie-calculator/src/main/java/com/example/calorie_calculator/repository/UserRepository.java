package com.example.calorie_calculator.repository;


import com.example.calorie_calculator.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByIdAndDeletedIsFalse(Long id);

	List<User> findAllByDeletedIsFalse();



}
