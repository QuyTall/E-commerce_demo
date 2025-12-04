package com.ecommerce.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data; // Import Lombok để tự sinh Getter/Setter
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data // <--- Annotation này CỰC QUAN TRỌNG, nó tự tạo setTotalPrice
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Tên biến phải là totalPrice (để khớp với JSON từ Frontend)
    private Double totalPrice; 
    
    private String status;
    private String customerName;
    private String phone;
    private String address;
    
    @Column(name = "created_at")
    private Date createdAt = new Date();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> items;
}