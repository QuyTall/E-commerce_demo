package com.ecommerce.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName; // Lưu tên lúc mua (đề phòng sau này đổi tên sp)
    private double price;       // Giá lúc mua
    private int quantity;
    private String image;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore // Tránh lỗi vòng lặp vô tận khi chuyển thành JSON
    private Order order;
}