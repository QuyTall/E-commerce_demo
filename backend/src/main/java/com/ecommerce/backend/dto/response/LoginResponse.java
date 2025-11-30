package com.ecommerce.backend.dto.response;

import com.ecommerce.backend.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor // Cần thiết cho Jackson deserialization
@Builder
public class LoginResponse {
    private String token;
    private String username;
    private Role role; // Frontend sẽ nhận được string "USER" hoặc "ADMIN"
}