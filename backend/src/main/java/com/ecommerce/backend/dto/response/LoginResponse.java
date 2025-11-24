package com.ecommerce.backend.dto.response;

import com.ecommerce.backend.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
    private Role role;
}