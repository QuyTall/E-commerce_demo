package com.ecommerce.backend.config;

import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.entity.enums.Role;
import com.ecommerce.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Kiểm tra xem admin đã có chưa
        if (userRepository.findByUsername("admin@example.com").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin@example.com");
            admin.setEmail("admin@example.com");
            // 👇 Java sẽ tự mã hoá mật khẩu chuẩn theo máy của bạn
            admin.setPassword(passwordEncoder.encode("123456")); 
            admin.setRole(Role.ADMIN);
            
            userRepository.save(admin);
            System.out.println("---------------------------------");
            System.out.println("✅ ĐÃ TẠO TÀI KHOẢN ADMIN THÀNH CÔNG!");
            System.out.println("User: admin@example.com");
            System.out.println("Pass: 123456");
            System.out.println("---------------------------------");
        }
    }
}