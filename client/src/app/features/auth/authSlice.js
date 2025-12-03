import { createSlice } from "@reduxjs/toolkit";

// Lấy user từ localStorage nếu có
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: storedUser,
  isLoggedIn: !!storedUser,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Lưu vào ổ cứng
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user"); // Xóa khỏi ổ cứng
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;