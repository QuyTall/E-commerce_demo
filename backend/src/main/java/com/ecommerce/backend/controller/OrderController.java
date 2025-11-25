package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderItem;
import com.ecommerce.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;

    // 1. KHÁCH HÀNG: Đặt hàng (Tạo đơn mới)
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        order.setStatus("PENDING"); // Mặc định là Chờ xử lý
        
        // Gán order cho từng item để lưu vào DB chuẩn
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
            }
        }
        return orderRepository.save(order);
    }

    // 2. ADMIN: Xem tất cả đơn hàng
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    // 3. ADMIN: Cập nhật trạng thái (Duyệt đơn / Giao hàng)
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestBody String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}