package com.ecommerce.backend.dto.request;
import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private Long userId;
    private Double totalPrice;
    private List<OrderItemRequest> orderItems;
    private String customerName;
    private String phone;
    private String address;
}