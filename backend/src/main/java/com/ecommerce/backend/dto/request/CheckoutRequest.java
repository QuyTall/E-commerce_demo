package com.ecommerce.backend.dto.request;

import lombok.Data;

@Data
public class CheckoutRequest {
    private String stripeToken;        // mock: "tok_visa" hoặc "tok_mastercard"
    private String email;
    private String name;
}