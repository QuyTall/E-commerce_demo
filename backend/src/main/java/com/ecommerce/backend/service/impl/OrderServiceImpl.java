package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.entity.*;
import com.ecommerce.backend.entity.enums.OrderStatus;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.service.OrderService;
import com.ecommerce.backend.service.StripeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final StripeService stripeService;

    @Override
    public String createCheckoutSession(String username) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Giỏ hàng trống!"));

        if (cart.getItems().isEmpty()) {
            throw new IllegalArgumentException("Không thể thanh toán với giỏ hàng trống!");
        }

        String successUrl = "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}";
        String cancelUrl = "http://localhost:3000/checkout/cancel";

        return stripeService.createCheckoutSession(
                cart.getTotal(),
                "usd",
                successUrl,
                cancelUrl
        );
    }

    @Override
    @Transactional
    public Map<String, String> confirmPayment(String sessionId, String username) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Giỏ hàng trống!"));

        // Tạo đơn hàng
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(cart.getTotal());
        order.setStatus(OrderStatus.PAID);
        order.setCreatedAt(LocalDateTime.now());
        orderRepository.save(order);

        // Copy items từ cart → order
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setProductName(cartItem.getProduct().getName());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItemRepository.save(orderItem);

            // Giảm stock
            Product p = cartItem.getProduct();
            if (p.getStock() < cartItem.getQuantity()) {
                throw new IllegalArgumentException("Sản phẩm " + p.getName() + " không đủ hàng!");
            }
            p.setStock(p.getStock() - cartItem.getQuantity());
            productRepository.save(p);
        }

        // Xóa giỏ hàng
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.delete(cart);

        Map<String, String> result = new HashMap<>();
        result.put("message", "Thanh toán thành công! Đơn hàng #" + order.getId());
        result.put("orderId", order.getId().toString());

        return result;
    }
}