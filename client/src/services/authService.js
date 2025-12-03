import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// ====================== LOGIN ======================
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });

        // Nếu backend trả về token => lưu vào localStorage
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Lỗi máy chủ" };
    }
};

// ====================== REGISTER ======================
export const registerUser = async (userData) => {
    // userData = { username, email, password }
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { message: "Lỗi Server" };
    }
};
