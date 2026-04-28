package com.example.calorie_calculator.service;

import com.example.calorie_calculator.domain.Food;
import com.example.calorie_calculator.repository.FoodRepository;
import com.example.calorie_calculator.service.dto.FoodDto;
import com.example.calorie_calculator.service.mapper.FoodMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class FoodService {

	private final FoodRepository repository;

	private final FoodMapper mapper;


	public List<FoodDto> findAll() {
		return mapper.toDto(repository.findAllByDeletedIsFalse());
	}

	public FoodDto findById(Long id){
		return mapper.toDto(findEntityById(id));
	}

	private Food findEntityById(Long id) {
		return repository.findByIdAndDeletedIsFalse(id)
				.orElseThrow(() -> new EntityNotFoundException("not found"));
	}

	public FoodDto save(FoodDto dto) {
		dto.setDeleted(false);
		Food savedEntity = repository.save(mapper.toEntity(dto));
		return mapper.toDto(savedEntity);
	}

	public FoodDto update(FoodDto dto) {
		findEntityById(dto.getId());
		return save(dto);
	}

	public void deleteById(Long id) {
		Food entity = findEntityById(id);
		entity.setDeleted(Boolean.TRUE);
		repository.save(entity);
	}

}
