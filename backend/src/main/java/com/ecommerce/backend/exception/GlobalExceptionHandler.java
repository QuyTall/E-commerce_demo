package com.ecommerce.backend.exception;

import com.ecommerce.backend.dto.response.ApiResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleResourceNotFound(ResourceNotFoundException ex, WebRequest request) {
        // Đã sửa: Thêm mã lỗi (404) vào hàm error
        return new ResponseEntity<>(ApiResponse.error(HttpStatus.NOT_FOUND.value(), ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<String>> handleIllegalArgument(IllegalArgumentException ex, WebRequest request) {
        // Đã sửa: Thêm mã lỗi (400)
        return new ResponseEntity<>(ApiResponse.error(HttpStatus.BAD_REQUEST.value(), ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<String>> handleDataIntegrityViolation(DataIntegrityViolationException ex, WebRequest request) {
        // Đã sửa: Thêm mã lỗi (400)
        return new ResponseEntity<>(ApiResponse.error(HttpStatus.BAD_REQUEST.value(), "Invalid data: " + ex.getMostSpecificCause().getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGlobalException(Exception ex, WebRequest request) {
        // Đã sửa: Thêm mã lỗi (500)
        return new ResponseEntity<>(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}