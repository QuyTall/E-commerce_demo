package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.request.AddToCartRequest;
import com.ecommerce.backend.dto.response.ApiResponse;
import com.ecommerce.backend.dto.response.CartResponse;
import com.ecommerce.backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ApiResponse<CartResponse> getCart(Authentication auth) {
        log.info("GET /api/cart - User: {}", auth.getName());
        return ApiResponse.success(cartService.getCart(auth.getName()));
    }

    @PostMapping("/add")
    public ApiResponse<CartResponse> addToCart(Authentication auth,
                                               @Valid @RequestBody AddToCartRequest request) {
        log.info("POST /api/cart/add - User: {}, Request: {}", auth.getName(), request);
        return ApiResponse.success(
                cartService.addToCart(auth.getName(), request),
                "Added to cart successfully"
        );
    }

    @DeleteMapping("/remove/{productId}")
    public ApiResponse<CartResponse> removeFromCart(Authentication auth,
                                                    @PathVariable Long productId) {
        log.info("DELETE /api/cart/remove/{} - User: {}", productId, auth.getName());
        return ApiResponse.success(
                cartService.removeFromCart(auth.getName(), productId),
                "Removed from cart"
        );
    }

    @PostMapping("/clear")
    public ApiResponse<Void> clearCart(Authentication auth) {
        log.info("POST /api/cart/clear - User: {}", auth.getName());
        cartService.clearCart(auth.getName());
        return ApiResponse.success(null, "Cart cleared");
    }
}