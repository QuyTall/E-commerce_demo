import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { cartMiddleware } from "./features/cart/cartSlice";
import authReducer from "./features/auth/authSlice"; // <--- THÊM

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // <--- THÊM
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
