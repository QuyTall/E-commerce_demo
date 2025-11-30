package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT") // Cho phép mô tả dài
    private String description;

    @Column(nullable = false)
    private double price;

    

    // 🔥 FIX LỖI MẤT ẢNH: Dùng TEXT để lưu link ảnh siêu dài
    @Column(columnDefinition = "TEXT") 
    private String image;

    private String brand;

    @Column(nullable = false) // Đảm bảo có Category
    private String category;

    private int stock = 100;
    private double rating = 5.0;
    private int numReviews = 0;
}