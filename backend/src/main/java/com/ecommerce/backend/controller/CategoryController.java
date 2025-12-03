package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.ApiResponse;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> getAllCategories() {
        List<Category> categories = categoryService.findAll();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(category));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Category>> createCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.save(category);
        return new ResponseEntity<>(ApiResponse.success(savedCategory), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        Category category = categoryService.findById(id);
        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());
        category.setHot(categoryDetails.isHot());
        Category updatedCategory = categoryService.save(category);
        return ResponseEntity.ok(ApiResponse.success(updatedCategory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}