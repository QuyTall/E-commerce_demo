package com.ecommerce.backend.service;

import java.util.Map;

public interface OrderService {
    String createCheckoutSession(String username) throws Exception;
    Map<String, String> confirmPayment(String sessionId, String username) throws Exception;
}