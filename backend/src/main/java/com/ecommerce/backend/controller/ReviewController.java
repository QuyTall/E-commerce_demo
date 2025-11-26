package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReviewController {

    @PostMapping("/add-review")
    public ApiResponse<String> addReview(Authentication auth, @RequestBody Map<String, Object> reviewData) {
        // Logic giả lập (Lưu vào DB sau)
        return ApiResponse.success(null, "Cảm ơn bạn đã đánh giá!");
    }
}