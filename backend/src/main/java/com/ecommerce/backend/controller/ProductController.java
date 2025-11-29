package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.ApiResponse; // Nhớ import ApiResponse
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    // 1. Lấy tất cả
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // 2. Lấy chi tiết
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // --- API ADMIN (Thêm/Sửa/Xóa) ---

    // 3. Thêm mới
    @PostMapping
    public ApiResponse<Product> addProduct(@RequestBody Product product) {
        Product newProduct = productService.addProduct(product);
        return ApiResponse.success(newProduct, "Thêm sản phẩm thành công");
    }

    // 4. Cập nhật
    @PutMapping("/{id}")
    public ApiResponse<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);
        return ApiResponse.success(updated, "Cập nhật sản phẩm thành công");
    }

    // 5. Xoá bỏ
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ApiResponse.success(null, "Xóa sản phẩm thành công");
    }
}