package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.ApiResponse;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // ADD PRODUCT (ADMIN ONLY)
    @PostMapping
    public ApiResponse<Product> addProduct(@Valid @RequestBody Product product) {
        return ApiResponse.success(productService.addProduct(product), "Product added successfully");
    }

    // GET ALL PRODUCTS (PAGINATION)
    @GetMapping
    public ApiResponse<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> products = productService.getAllProducts(PageRequest.of(page, size));
        return ApiResponse.success(products, "Products retrieved successfully");
    }

    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public ApiResponse<Product> getProductById(@PathVariable Long id) {
        return ApiResponse.success(productService.getProductById(id), "Product retrieved successfully");
    }

    // UPDATE PRODUCT (ADMIN ONLY)
    @PutMapping("/{id}")
    public ApiResponse<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        return ApiResponse.success(productService.updateProduct(id, product), "Product updated successfully");
    }

    // DELETE PRODUCT (ADMIN ONLY)
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ApiResponse.success(null, "Product deleted successfully");
    }
}