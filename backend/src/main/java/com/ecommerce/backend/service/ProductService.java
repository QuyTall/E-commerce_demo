package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ProductService {
    // Thêm mới
    Product addProduct(Product product);

    // Lấy tất cả (Dạng List thường - Cho Admin Dashboard nhẹ)
    List<Product> getAllProducts();

    // Lấy tất cả (Dạng Phân trang - Cho trang Shop sau này)
    Page<Product> getAllProducts(Pageable pageable);

    // Lấy sản phẩm nổi bật (Cho Client trang chủ)
    List<Product> getTrendyProducts();

    // Lấy chi tiết
    Product getProductById(Long id);

    // Cập nhật
    Product updateProduct(Long id, Product updatedProduct);

    // Xóa
    void deleteProduct(Long id);
}