package com.ecommerce.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Áp dụng cho mọi API
                        .allowedOrigins(
                            "http://localhost:3000",       // Cho phép chạy test ở máy bạn
                            "http://localhost:3001",
                            "http://100.26.182.209:3000",  // 👇 Cho phép Client trên Server
                            "http://100.26.182.209:3001"   // 👇 Cho phép Admin trên Server
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // Có thể bật true khi đã chỉ định rõ domain
            }
        };
    }
}