package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    @PostMapping("/create-payment-intent")
    public ApiResponse<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> paymentData) {
        // Trả về token giả để Frontend không bị lỗi
        return ApiResponse.success(Map.of("clientSecret", "test_secret_token"), "Payment initialized");
    }
}