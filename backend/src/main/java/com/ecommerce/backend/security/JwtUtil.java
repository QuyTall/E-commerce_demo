package com.ecommerce.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY_STRING;

    private Key signingKey;
    private static final long TOKEN_VALIDITY = 1000 * 60 * 60 * 10; // 10 hours

    @PostConstruct
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY_STRING);
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    // 1. Tạo Token (Builder) - Sử dụng API mới
    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        
        return Jwts.builder()
                .claims(claims) // Thay thế setClaims()
                .subject(username) // Thay thế setSubject()
                .issuedAt(new Date(System.currentTimeMillis())) // Thay thế setIssuedAt()
                .expiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY)) // Thay thế setExpiration()
                .signWith(signingKey) // API mới - không cần chỉ định algorithm
                .compact();
    }

    // 2. Lấy thông tin từ Token - Sử dụng API mới
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(signingKey)
                .build() // Thêm build() để tạo JwtParser
                .parseClaimsJws(token)
                .getBody();
    }

    // 3. Lấy Username từ Token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // 4. Kiểm tra Token còn hạn không
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // 5. Kiểm tra thời hạn
    private Boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}