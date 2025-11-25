package com.ecommerce.backend.config;

import com.ecommerce.backend.security.JwtFilter;
import com.ecommerce.backend.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // Đảm bảo import cái này
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        
                        // 🔥 FIX 1: CHO PHÉP MỌI REQUEST OPTIONS ĐI QUA
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
                        
                        // 👇 FIX 2: MỞ KHÓA PROFILE VÀ GIỎ HÀNG CHO KHÁCH VÃNG LAI (GET & POST)
                        .requestMatchers(HttpMethod.GET, "/api/user/profile").permitAll() // Cho phép GET profile (sẽ trả về null nếu chưa login)
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/products/**").permitAll()
                        .requestMatchers("/api/category/**").permitAll()
                        .requestMatchers("/api/brand/**").permitAll()
                        .requestMatchers("/api/store/**").permitAll()
                        .requestMatchers("/api/cart/**").permitAll() // Thao tác giỏ hàng (Guest/Anon)
                        .requestMatchers("/api/orders/**").permitAll() 

                        // Các trang Admin thì bắt buộc phải có ROLE_ADMIN
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .userDetailsService(userDetailsService)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
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