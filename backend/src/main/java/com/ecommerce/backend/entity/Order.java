package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders") // Bắt buộc tên bảng là orders
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName; // Tên người nhận
    private String phone;
    private String address;
    private double totalAmount;  // Tổng tiền
    private String status;       // PENDING (Chờ), SHIPPED (Đã giao)...
    
    private Date createdAt = new Date(); // Ngày đặt hàng

    // Danh sách các món trong đơn này
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}