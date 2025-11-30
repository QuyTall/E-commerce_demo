package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.request.LoginRequest;
import com.ecommerce.backend.dto.request.RegisterRequest;
import com.ecommerce.backend.dto.response.ApiResponse;
import com.ecommerce.backend.dto.response.LoginResponse;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.security.JwtUtil;
import com.ecommerce.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth") // ✅ Khớp với SecurityConfig
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Hỗ trợ thêm
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ApiResponse<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Register request: {}", request.getUsername());
        User user = userService.register(request);
        
        // Tạo token ngay để login luôn
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        
        return ApiResponse.success(
                new LoginResponse(token, user.getUsername(), user.getRole()),
                "Đăng ký thành công"
        );
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login attempt: {}", request.getUsername());

        try {
            // 1. Xác thực qua Spring Security
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            // 2. Lấy thông tin User
            User user = userRepository.findByUsernameOrEmail(request.getUsername(), request.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("User not found"));

            // 3. Tạo Token
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

            log.info("Login successful: {}", user.getUsername());
            return ApiResponse.success(
                    new LoginResponse(token, user.getUsername(), user.getRole()),
                    "Đăng nhập thành công"
            );

        } catch (BadCredentialsException e) {
            return ApiResponse.error(401, "Tài khoản hoặc mật khẩu không đúng!");
        } catch (Exception e) {
            log.error("Login error", e);
            return ApiResponse.error(500, "Lỗi hệ thống: " + e.getMessage());
        }
    }
}