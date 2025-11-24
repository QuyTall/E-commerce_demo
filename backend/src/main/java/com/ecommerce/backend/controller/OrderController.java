package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.ApiResponse;
import com.ecommerce.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Tạo session thanh toán Stripe
    @PostMapping("/create-checkout-session")
    public ApiResponse<Map<String, String>> createCheckoutSession(Authentication auth) throws Exception {
        String url = orderService.createCheckoutSession(auth.getName());
        Map<String, String> response = new HashMap<>();
        response.put("checkoutUrl", url);
        return ApiResponse.success(response, "Chuyển đến trang thanh toán Stripe");
    }

    // Xác nhận thanh toán thành công (gọi từ frontend sau khi Stripe redirect)
    @GetMapping("/confirm-payment")
    public ApiResponse<Map<String, String>> confirmPayment(
            @RequestParam("session_id") String sessionId,
            Authentication auth) throws Exception {
        Map<String, String> result = orderService.confirmPayment(sessionId, auth.getName());
        return ApiResponse.success(result, "Thanh toán thành công!");
    }
}