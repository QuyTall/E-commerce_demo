package com.ecommerce.backend.controller; // <--- SỬA LỖI THIẾU PACKAGE

import com.ecommerce.backend.dto.request.OrderItemRequest;
import com.ecommerce.backend.dto.request.OrderRequest;
import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderItem;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request) {
        Order order = new Order();
        
        // 1. Tìm User (Sửa lỗi setUser undefined)
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        
        order.setTotalPrice(request.getTotalPrice());
        order.setStatus("PENDING");

        // 2. Map danh sách sản phẩm (Sửa lỗi setProduct undefined)
        List<OrderItem> items = new ArrayList<>();
        if (request.getOrderItems() != null) {
            for (OrderItemRequest itemReq : request.getOrderItems()) {
                OrderItem item = new OrderItem();
                
                Product product = productRepository.findById(itemReq.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));
                
                item.setProduct(product);
                item.setQuantity(itemReq.getQuantity());
                item.setPrice(itemReq.getPrice());
                item.setOrder(order); 
                items.add(item);
            }
        }
        order.setItems(items);

        return orderRepository.save(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}