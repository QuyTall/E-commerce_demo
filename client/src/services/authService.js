import axios from "axios";

// 👇 IP SERVER CỦA BẠN
const API_URL = "http://100.26.182.209:8080/api/auth";

const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  // 👇 SỬA Ở ĐÂY: Dựa trên JSON bạn gửi {"success": true, "data": {...}}
  // Chúng ta cần lấy cái cục "data" bên trong
  const responseData = response.data; 
  
  if (responseData.success && responseData.data) {
      // Lưu đúng cái object chứa token (id, token, username, role)
      localStorage.setItem("user", JSON.stringify(responseData.data));
      return responseData.data;
  }

  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

export {
    registerUser,
    loginUser,
    logoutUser
};