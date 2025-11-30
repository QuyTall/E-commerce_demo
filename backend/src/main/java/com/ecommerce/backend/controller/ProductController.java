package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.ApiResponse;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products") // ✅ Khớp với SecurityConfig
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // --- API ADMIN ---
    @PostMapping
    public ApiResponse<Product> addProduct(@RequestBody Product product) {
        Product newProduct = productService.addProduct(product);
        return ApiResponse.success(newProduct, "Thêm sản phẩm thành công");
    }

    @PutMapping("/{id}")
    public ApiResponse<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);
        return ApiResponse.success(updated, "Cập nhật sản phẩm thành công");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ApiResponse.success(null, "Xóa sản phẩm thành công");
    }
}