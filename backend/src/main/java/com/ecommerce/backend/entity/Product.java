package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Dùng chuẩn id, không cần hack _id nữa

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT") // Cho phép nhập mô tả dài
    private String description;

    @Column(nullable = false)
    private double price;

    private String image; // Lưu link ảnh

    private String brand; // Thương hiệu (Apple, Samsung...)

    private int stock = 100; // Số lượng tồn kho
    
    private double rating = 5.0; // Đánh giá mặc định
    
    private int numReviews = 0; // Số lượng review
}