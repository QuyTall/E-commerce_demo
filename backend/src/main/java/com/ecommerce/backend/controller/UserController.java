package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository; // Dùng để tìm user
    
    // API GET PROFILE (Được gọi liên tục bởi Frontend để kiểm tra trạng thái login)
    @GetMapping(value = "/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getProfile(Authentication authentication) {
        
        // Nếu user đã đăng nhập hợp lệ (có token)
        if (authentication != null && authentication.isAuthenticated()) {
            String currentUsername = authentication.getName();
            
            // Tìm user trong DB và trả về
            return userRepository.findByUsernameOrEmail(currentUsername, currentUsername)
                    .orElse(null); // Trả về null nếu không tìm thấy (Spring sẽ tự động mã hoá 500)
        }
        
        // Nếu không có token (Anonymous), SecurityConfig đã mở cửa, nhưng ta trả về null
        return null; 
    }
}