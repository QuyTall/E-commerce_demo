/**
 * Updated for Spring Boot Connection
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const canimApi = createApi({
  reducerPath: "canimApi",
  baseQuery: fetchBaseQuery({
    // 👇 1. Trỏ thẳng về API Java
    baseUrl: "http://localhost:8080/api",
    
    prepareHeaders: (headers) => {
      // 👇 2. Lấy token từ localStorage (Java trả về 'token')
      // Code cũ dùng 'accessToken', mình sửa lại để nó tìm cả 2 cho chắc
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User", "Product", "Brand", "Category", "Store", "Cart", "Favorite", "Purchase", "Review",
  ],
  endpoints: () => ({}),
});