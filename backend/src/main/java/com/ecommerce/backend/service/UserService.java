package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.request.RegisterRequest;
import com.ecommerce.backend.entity.User;
import java.util.Optional;

public interface UserService {
    User register(RegisterRequest request);
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);  
    User getCurrentUser(String username);
}