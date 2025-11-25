package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Hàm này Spring Boot tự động hiểu: "Tìm 8 sản phẩm giá cao nhất" (Làm gợi ý Trendy)
    List<Product> findTop8ByOrderByPriceDesc();
    
    // Hàm này: "Tìm 4 sản phẩm mới nhất" (Theo ID giảm dần)
    List<Product> findTop4ByOrderByIdDesc();
    
}