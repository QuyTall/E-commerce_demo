/**
 * ProductApi - Đã thêm bộ chuyển đổi dữ liệu thông minh
 * Giúp Java (name, image) khớp với Next.js (title, thumbnail, gallery)
 */

const { canimApi } = require("../canim");

// Hàm biến đổi dữ liệu Java -> Next.js
const transformProduct = (prod) => {
    // Nếu prod null thì trả về rỗng
    if (!prod) return {};

    // Lấy ảnh chính (ưu tiên image của Java, nếu không có thì lấy thumbnail)
    const mainImage = prod.image || prod.thumbnail || "https://via.placeholder.com/300";

    return {
        ...prod,
        _id: prod.id || prod._id,           // Khớp ID
        title: prod.name || prod.title,     // Khớp Tên
        thumbnail: mainImage,               // Khớp Ảnh đại diện
        price: prod.price,
        
        // 👇 QUAN TRỌNG: Tự tạo Gallery giả từ ảnh chính để không bị lỗi .map()
        gallery: prod.gallery || [
            { url: mainImage },
            { url: mainImage } // Nhân đôi lên nhìn cho vui mắt
        ],
        
        // Các trường khác
        description: prod.description || "Chưa có mô tả",
        category: prod.category || { title: "General" },
        brand: prod.brand || { title: "No Brand" }
    };
};

const productApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. Lấy tất cả sản phẩm
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Product"],
      // 👇 Biến đổi danh sách ngay khi vừa nhận về
      transformResponse: (response) => {
        const rawData = Array.isArray(response) ? response : (response.data || []);
        return {
            status: true,
            data: rawData.map(transformProduct) // Áp dụng hàm sửa lỗi cho từng sản phẩm
        };
      }
    }),

    // 2. Lấy 1 sản phẩm
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
      transformResponse: (response) => {
        return {
            status: true,
            data: transformProduct(response) // Áp dụng hàm sửa lỗi
        };
      }
    }),

    // 3. Thêm sản phẩm
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // 4. Cập nhật
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // 5. Xoá
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // 6. Lọc (Tạm dùng chung getProducts)
    getFilteredProducts: builder.mutation({
      query: (query) => ({
        url: `/products?${query}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const rawData = Array.isArray(response) ? response : (response.data || []);
        return {
            status: true,
            data: rawData.map(transformProduct)
        };
      }
    }),

  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductQuery,
  useGetFilteredProductsMutation,
  useDeleteProductMutation,
} = productApi;