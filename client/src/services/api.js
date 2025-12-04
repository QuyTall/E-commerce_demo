import axios from "axios";

// 👇 QUAN TRỌNG: Đổi localhost thành IP Server
const API_URL = "http://100.26.182.209:8080/api";
const IMAGE_BASE_URL = "http://100.26.182.209:8080/images/";

/* ===============================
   LẤY TẤT CẢ SẢN PHẨM
================================ */
export const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);

    return response.data.map((item) => {
      const realId = item.productId || item.id; // HỖ TRỢ CẢ HAI BACKEND

      return {
        id: realId.toString(),
        productName: item.productName,

        // 👇 Đã sửa lại logic ảnh để trỏ về Server
        imgUrl:
          item.image && item.image.startsWith("http")
            ? item.image
            : `${IMAGE_BASE_URL}${item.image}`,

        category: item.category?.name?.toLowerCase() || "other",
        price: item.price,
        shortDesc: item.description
          ? item.description.substring(0, 50) + "..."
          : "Mô tả ngắn",

        description: item.description || "Chi tiết sản phẩm đang cập nhật...",
        reviews: [],
        avgRating: 4.5,
      };
    });
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

    const realId = item.productId || item.id;

    return {
      id: realId.toString(),
      productName: item.productName,

      // 👇 Đã sửa lại logic ảnh để trỏ về Server
      imgUrl:
        item.image && item.image.startsWith("http")
          ? item.image
          : `${IMAGE_BASE_URL}${item.image}`,

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