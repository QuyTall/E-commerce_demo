import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    
    // --- SỬA LỖI Ở ĐÂY ---
    // Backend trả về: { status, message, data: { token, ... } }
    // Ta chỉ cần lấy phần 'data' bên trong
    const userData = response.data.data; 
    
    if (userData && userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    
    return userData; // Trả về object user sạch
  } catch (error) {
    throw error.response ? error.response.data : { message: "Lỗi Server" };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};