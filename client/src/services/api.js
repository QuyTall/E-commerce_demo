import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Link Backend của bạn

export const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    
    // MAP DỮ LIỆU (Backend -> Multimart)
    return response.data.map((item) => ({
      id: item.productId.toString(), // ID phải là chuỗi
      productName: item.productName,
      imgUrl: item.image.startsWith("http") 
              ? item.image 
              : `http://localhost:8080/images/${item.image}`,
      category: item.category ? item.category.name.toLowerCase() : "sofa", // Tạm gán danh mục
      price: item.price,
      shortDesc: item.description || "Mô tả ngắn",
      description: item.description || "Mô tả chi tiết sản phẩm...",
      reviews: [],
      avgRating: 4.5,
    }));
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    return [];
  }
};