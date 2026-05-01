package com.example.calorie_calculator.service;

import com.example.calorie_calculator.domain.Ingredient;
import com.example.calorie_calculator.repository.IngredientRepository;
import com.example.calorie_calculator.service.dto.IngredientDto;
import com.example.calorie_calculator.service.mapper.IngredientMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {

	private final IngredientRepository repository;

	private final IngredientMapper mapper;


	@Cacheable("ingredients")
	public List<IngredientDto> findAll() {
		return mapper.toDto(repository.findAllByDeletedIsFalseOrderByIdDesc());
	}

	public IngredientDto findById(Long id){
		return mapper.toDto(findEntityById(id));
	}

	private Ingredient findEntityById(Long id) {
		return repository.findByIdAndDeletedIsFalse(id)
				.orElseThrow(() -> new EntityNotFoundException("not found"));
	}

	@CacheEvict(value = "ingredients", allEntries = true)
	public IngredientDto save(IngredientDto dto) {
		dto.setDeleted(false);
		Ingredient savedEntity = repository.save(mapper.toEntity(dto));
		return mapper.toDto(savedEntity);
	}

	@CacheEvict(value = "ingredients", allEntries = true)
	public void deleteById(Long id) {
		Ingredient entity = findEntityById(id);
		entity.setDeleted(Boolean.TRUE);
		repository.save(entity);
	}

}
