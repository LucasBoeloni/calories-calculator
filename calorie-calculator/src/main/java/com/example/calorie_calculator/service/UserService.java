package com.example.calorie_calculator.service;

import com.example.calorie_calculator.domain.User;
import com.example.calorie_calculator.repository.UserRepository;
import com.example.calorie_calculator.service.dto.UserDto;
import com.example.calorie_calculator.service.mapper.UserMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	private final UserRepository repository;

	private final UserMapper mapper;


	public List<UserDto> findAll() {
		return mapper.toDto(repository.findAllByDeletedIsFalse());
	}

	public UserDto findById(Long id){
		return mapper.toDto(findEntityById(id));
	}

	private User findEntityById(Long id) {
		return repository.findByIdAndDeletedIsFalse(id)
				.orElseThrow(() -> new EntityNotFoundException("not found"));
	}

	public UserDto save(UserDto dto) {
		User savedEntity = repository.save(mapper.toEntity(dto));
		return mapper.toDto(savedEntity);
	}

	public UserDto update(UserDto dto) {
		findEntityById(dto.getId());
		return save(dto);
	}

	public void deleteById(Long id) {
		User entity = findEntityById(id);
		repository.delete(entity);
	}

}
