package com.ecommerce.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MetaController {

    // 1. Giả lập API Danh mục (Categories)
    @GetMapping("/category/get-categories")
    public Map<String, Object> getCategories() {
        List<Map<String, Object>> categories = new ArrayList<>();
        categories.add(createMeta(1L, "Thời trang Nam", "fashion"));
        categories.add(createMeta(2L, "Thời trang Nữ", "dress"));
        categories.add(createMeta(3L, "Điện tử", "tech"));
        categories.add(createMeta(4L, "Giày dép", "shoes"));

        return wrapResponse(categories);
    }

    // 2. Giả lập API Thương hiệu (Brands)
    @GetMapping("/brand/get-brands")
    public Map<String, Object> getBrands() {
        List<Map<String, Object>> brands = new ArrayList<>();
        brands.add(createMeta(1L, "Nike", "nike"));
        brands.add(createMeta(2L, "Adidas", "adidas"));
        brands.add(createMeta(3L, "Apple", "apple"));
        brands.add(createMeta(4L, "Samsung", "samsung"));

        return wrapResponse(brands);
    }

    // 3. Giả lập API Cửa hàng (Stores)
    @GetMapping("/store/get-stores")
    public Map<String, Object> getStores() {
        List<Map<String, Object>> stores = new ArrayList<>();
        stores.add(createMeta(1L, "Nova Store HN", "hanoi"));
        stores.add(createMeta(2L, "Nova Store DN", "danang"));
        stores.add(createMeta(3L, "Nova Store HCM", "hcm"));

        return wrapResponse(stores);
    }

    // --- Hàm hỗ trợ tạo dữ liệu nhanh ---
    private Map<String, Object> createMeta(Long id, String title, String key) {
        Map<String, Object> map = new HashMap<>();
        map.put("_id", id); // Next.js dùng _id
        map.put("title", title);
        map.put("thumbnail", "https://placehold.co/100x100"); // Ảnh mẫu
        return map;
    }

    // --- Hàm đóng gói đúng chuẩn Next.js mong đợi ---
    private Map<String, Object> wrapResponse(Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", true);
        response.put("message", "Success");
        response.put("data", data); // Next.js cần cái 'data' này
        return response;
    }
}