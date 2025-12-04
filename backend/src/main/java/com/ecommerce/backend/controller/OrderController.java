package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.request.OrderRequest;
import com.ecommerce.backend.dto.request.OrderItemRequest;
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
import java.util.Map;

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
        
        // Tìm User từ ID
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        
        // Lưu thông tin khách hàng
        order.setCustomerName(request.getCustomerName());
        order.setPhone(request.getPhone());
        order.setAddress(request.getAddress());
        order.setTotalPrice(request.getTotalPrice());
        order.setStatus("PENDING");

        // Xử lý Order Items
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

    // --- THÊM ĐOẠN NÀY ---
    @PutMapping("/{id}")
    public Order updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        // Frontend gửi lên dạng JSON: { "status": "SHIPPED" }
        if (statusMap.containsKey("status")) {
            order.setStatus(statusMap.get("status"));
        }
        
        return orderRepository.save(order);
    }
}