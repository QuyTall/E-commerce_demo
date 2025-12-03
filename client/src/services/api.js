import axios from "axios";

// Đường dẫn Backend Spring Boot
const API_URL = "http://localhost:8080/api";

/* ===============================
   LẤY TẤT CẢ SẢN PHẨM
================================ */
export const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);

    return response.data.map((item) => ({
      id: item.productId.toString(), // <--- SỬA Ở ĐÂY
      productName: item.productName,

      imgUrl:
        item.image && item.image.startsWith("http")
          ? item.image
          : `http://localhost:8080/images/${item.image}`,

      category: item.category?.name?.toLowerCase() || "other",
      price: item.price,
      shortDesc: item.description
        ? item.description.substring(0, 50) + "..."
        : "Mô tả ngắn",

      description: item.description || "Chi tiết sản phẩm đang cập nhật...",
      reviews: [],
      avgRating: 4.5,
    }));
  } catch (error) {
    console.error("Lỗi khi gọi API products:", error);
    return [];
  }
};

/* ===============================
   LẤY CHI TIẾT 1 SẢN PHẨM
================================ */
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    const item = response.data;

    return {
      id: item.productId.toString(), // <--- SỬA Ở ĐÂY
      productName: item.productName,

      imgUrl:
        item.image && item.image.startsWith("http")
          ? item.image
          : `http://localhost:8080/images/${item.image}`,

      category: item.category?.name?.toLowerCase() || "other",
      price: item.price,
      shortDesc: item.description
        ? item.description.substring(0, 50) + "..."
        : "Mô tả ngắn",

      description: item.description || "Chi tiết sản phẩm...",
      reviews: [],
      avgRating: 4.5,
    };
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    return null;
  }
};
