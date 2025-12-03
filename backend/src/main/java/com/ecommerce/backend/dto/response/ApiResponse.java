package com.ecommerce.backend.dto.response;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private int code;

    // 1. Hàm success đầy đủ
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, message, data, 200);
    }

    // 2. Hàm success nhanh (Chỉ cần data, tự điền message) -> Fix lỗi CartController
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "Success", data, 200);
    }

    // 3. Hàm error đầy đủ (Có mã lỗi) -> Fix lỗi GlobalExceptionHandler
    public static <T> ApiResponse<T> error(int code, String message) {
        return new ApiResponse<>(false, message, null, code);
    }

    public static Object error(int value, String string, Map<String,String> errors) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'error'");
    }
}