package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.request.AddToCartRequest;
import com.ecommerce.backend.dto.response.CartResponse;

public interface CartService {
    CartResponse getCart(String username);
    CartResponse addToCart(String username, AddToCartRequest request);
    CartResponse removeFromCart(String username, Long productId);
    void clearCart(String username);
}