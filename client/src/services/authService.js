import axios from "axios";

// 👇 QUAN TRỌNG: IP Server AWS của bạn
const API_URL = "http://100.26.182.209:8080/api/auth";

// Đăng ký
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Đăng nhập
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data; // Trả về data để Redux xử lý tiếp
};

// Đăng xuất
export const logoutUser = () => {
  localStorage.removeItem("user");
};