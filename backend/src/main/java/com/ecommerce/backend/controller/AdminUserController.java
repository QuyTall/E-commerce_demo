package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.ApiResponse;
import com.ecommerce.backend.dto.response.UserResponse;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminUserController {

    private final UserRepository userRepository;

    // 1. Lấy danh sách tất cả User (Kèm tổng tiền mua - Giả lập)
    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUsers() {
        List<User> users = userRepository.findAll();
        
        List<UserResponse> response = users.stream().map(user -> {
            // 💡 TODO: Sau này bạn có thể query bảng Orders để tính tổng tiền thật
            // Hiện tại mình giả lập random để bạn test giao diện VIP
            double fakeTotalSpent = Math.random() > 0.7 ? 5000.0 : 100.0; 
            
            return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().toString(), // Hoặc user.getRole() nếu là String
                fakeTotalSpent
            );
        }).collect(Collectors.toList());

        return ApiResponse.success(response, "Lấy danh sách user thành công");
    }

    // 2. Cập nhật quyền (Thăng cấp/Giáng cấp)
    @PutMapping("/{id}/role")
    public ApiResponse<String> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        String newRole = body.get("role"); // "ADMIN", "USER", "VIP"
        
        // Nếu bạn dùng Enum: user.setRole(Role.valueOf(newRole));
        // Nếu bạn dùng String:
        // user.setRole(newRole); 
        
        // ⚠️ SỬA LẠI CHO KHỚP VỚI ENTITY CỦA BẠN (Mình giả định bạn dùng Enum Role trong bài trước)
         user.setRole(com.ecommerce.backend.entity.enums.Role.valueOf(newRole)); 

        userRepository.save(user);
        return ApiResponse.success(null, "Cập nhật quyền thành công: " + newRole);
    }

    // 3. Xóa User
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ApiResponse.success(null, "Đã xóa user");
    }
}