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
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ApiResponse<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Register request: {}", request.getUsername());
        try {
            // Gọi Service đăng ký
            User user = userService.register(request);
            
            // Tạo token ngay
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
            
            return ApiResponse.success(
                    new LoginResponse(token, user.getUsername(), user.getRole()),
                    "Đăng ký thành công"
            );
        } catch (IllegalArgumentException e) {
            // Bắt lỗi trùng Username/Email (Service ném ra)
            log.error("Register failed: {}", e.getMessage());
            return ApiResponse.error(400, e.getMessage()); // Trả về 400 để Frontend hiển thị toast.error
        } catch (Exception e) {
            log.error("System error", e);
            return ApiResponse.error(500, "Lỗi hệ thống: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login attempt: {}", request.getUsername());
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            User user = userRepository.findByUsernameOrEmail(request.getUsername(), request.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("User not found"));

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

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