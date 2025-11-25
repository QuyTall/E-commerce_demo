package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.request.AddToCartRequest;
import com.ecommerce.backend.dto.response.ApiResponse;
import com.ecommerce.backend.dto.response.CartResponse;
import com.ecommerce.backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException; // Nhớ import cái này
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") 
public class CartController {

    private final CartService cartService;

    // 🔥 FIX LỖI: Hàm kiểm tra xem User có phải là "anonymousUser" không
    private void checkAuthentication(Authentication auth) {
        if (auth == null || auth.getName().equals("anonymousUser")) {
            // Ném lỗi 401/403 nếu không đăng nhập (thay vì để nó crash 500)
            throw new AccessDeniedException("Vui lòng đăng nhập để thực hiện thao tác giỏ hàng.");
        }
    }

    // 1. GET /api/cart (Xem giỏ hàng)
    @GetMapping
    public ApiResponse<CartResponse> getCart(Authentication auth) {
        checkAuthentication(auth); // Bắt buộc đăng nhập
        log.info("GET /api/cart - User: {}", auth.getName());
        
        return ApiResponse.success(cartService.getCart(auth.getName()), "Cart retrieved successfully");
    }

    // 2. POST /api/cart/add-to-cart (Thêm sản phẩm)
    @PostMapping("/add-to-cart") // 🔥 FIX 2: Sửa endpoint cho khớp Frontend (Canim)
    public ApiResponse<CartResponse> addToCart(Authentication auth,
                                               @Valid @RequestBody AddToCartRequest request) {
        checkAuthentication(auth); // Bắt buộc đăng nhập
        log.info("POST /api/cart/add-to-cart - User: {}, Request: {}", auth.getName(), request);
        
        return ApiResponse.success(
                cartService.addToCart(auth.getName(), request),
                "Added to cart successfully"
        );
    }

    // 3. DELETE /api/cart/remove/{productId} (Xoá 1 món)
    @DeleteMapping("/remove/{productId}")
    public ApiResponse<CartResponse> removeFromCart(Authentication auth,
                                                     @PathVariable Long productId) {
        checkAuthentication(auth); // Bắt buộc đăng nhập
        log.info("DELETE /api/cart/remove/{} - User: {}", productId, auth.getName());
        
        return ApiResponse.success(
                cartService.removeFromCart(auth.getName(), productId),
                "Removed from cart"
        );
    }

    // 4. POST /api/cart/clear (Xoá hết)
    @PostMapping("/clear")
    public ApiResponse<Void> clearCart(Authentication auth) {
        checkAuthentication(auth); // Bắt buộc đăng nhập
        log.info("POST /api/cart/clear - User: {}", auth.getName());
        
        cartService.clearCart(auth.getName());
        return ApiResponse.success(null, "Cart cleared");
    }
}