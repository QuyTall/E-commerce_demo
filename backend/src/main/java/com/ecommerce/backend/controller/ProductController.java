package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Mở cửa cho mọi nơi truy cập
public class ProductController {

    private final ProductService productService;

    // 1. Lấy tất cả (Cho Admin và Shop)
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // 2. Lấy Top Trendy (Cho trang chủ)
    @GetMapping("/trendy")
    public List<Product> getTrendyProducts() {
        return productService.getTrendyProducts();
    }

    // 3. Lấy chi tiết 1 cái
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // --- API DÀNH RIÊNG CHO ADMIN ---
    
    // 4. Thêm mới (CREATE)
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    // 5. Cập nhật / Sửa chữa (UPDATE) - 👇 BẠN ĐANG THIẾU CÁI NÀY
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // 6. Xoá bỏ (DELETE)
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}