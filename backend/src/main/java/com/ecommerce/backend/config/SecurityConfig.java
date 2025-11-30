package com.ecommerce.backend.config;

import com.ecommerce.backend.security.JwtFilter;
import com.ecommerce.backend.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // Import HttpMethod
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // 🔥 QUAN TRỌNG: Thêm dòng này để kích hoạt CORS
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // 1. Cho phép Preflight Request (tránh lỗi CORS trên trình duyệt)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 2. Public API (Lưu ý: Phải có /api ở trước như bạn đã định nghĩa)
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/products/**",
                                "/api/category/**",
                                "/api/brand/**",
                                "/api/store/**",
                                "/images/**",
                                "/error"
                        ).permitAll()

                        // 3. Giỏ hàng & Đơn hàng (Nên mở để khách vãng lai xem, hoặc chặn tùy logic)
                        .requestMatchers("/api/cart/**", "/api/orders/**").permitAll()

                        // 4. Admin
                        .requestMatchers("/api/admin/**").hasAnyAuthority("ADMIN", "ROLE_ADMIN") // Sửa hasRole thành hasAnyAuthority cho chắc chắn

                        // 5. Các request còn lại phải đăng nhập
                        .anyRequest().authenticated()
                )
                .userDetailsService(userDetailsService)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🔥 Bean Cấu hình CORS (Cho phép Frontend gọi vào)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:3001")); // Cho phép cả Client và Admin
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}