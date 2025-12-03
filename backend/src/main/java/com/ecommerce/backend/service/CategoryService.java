package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
    }

    public Category save(Category category) {
        // Validation thêm nếu cần, ví dụ check name unique
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", id);
        }
        categoryRepository.deleteById(id);
    }
}