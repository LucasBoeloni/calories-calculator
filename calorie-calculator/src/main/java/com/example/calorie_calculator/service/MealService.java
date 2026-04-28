package com.example.calorie_calculator.service;

import com.example.calorie_calculator.domain.Meal;
import com.example.calorie_calculator.repository.MealRepository;
import com.example.calorie_calculator.service.dto.MealDto;
import com.example.calorie_calculator.service.mapper.MealMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MealService {

	private final MealRepository repository;

	private final MealMapper mapper;


	public List<MealDto> findAll() {
		return mapper.toDto(repository.findAllByDeletedIsFalse());
	}

	public MealDto findById(Long id){
		return mapper.toDto(findEntityById(id));
	}

	private Meal findEntityById(Long id) {
		return repository.findByIdAndDeletedIsFalse(id)
				.orElseThrow(() -> new EntityNotFoundException("not found"));
	}

	public MealDto save(MealDto dto) {
		dto.setDeleted(false);
		Meal savedEntity = repository.save(mapper.toEntity(dto));
		return mapper.toDto(savedEntity);
	}

	public MealDto update(MealDto dto) {
		findEntityById(dto.getId());
		return save(dto);
	}

	public void deleteById(Long id) {
		Meal entity = findEntityById(id);
		entity.setDeleted(Boolean.TRUE);
		repository.save(entity);
	}

}
