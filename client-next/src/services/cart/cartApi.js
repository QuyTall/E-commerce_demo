/**
 * Title: Write a program using JavaScript on CartApi
 * Updated for Spring Boot compatibility
 */

const { canimApi } = require("../canim");

const cartApi = canimApi.injectEndpoints({
  endpoints: (build) => ({
    // add to cart
    addToCart: build.mutation({
      query: (body) => ({
        url: "/cart/add-to-cart", // ✅ Giữ nguyên để khớp với CartController
        method: "POST",
        headers: {
          // 🔥 FIX 1: Lấy Token từ localStorage (tên key là 'token')
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Cart", "User"],
    }),

    // get from cart
    getFromCart: build.query({
      query: () => ({
        url: "/cart", // ✅ Sửa: Dùng endpoint gốc GET /api/cart
        method: "GET",
        headers: {
          // 🔥 FIX 2: Thêm Token vào Header để Backend biết giỏ hàng của ai
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Cart"],
    }),

    // delete from cart
    deleteFromCart: build.mutation({
      query: (id) => ({
        url: `/cart/remove/${id}`, // ✅ Sửa: Dùng endpoint /api/cart/remove/{id}
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Cart", "User"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetFromCartQuery,
  useDeleteFromCartMutation,
} = cartApi;