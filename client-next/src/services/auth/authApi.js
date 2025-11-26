const { canimApi } = require("../canim");

const authApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    // Đăng ký
    signUp: builder.mutation({
      query: (body) => ({
        url: "/auth/register", // ✅ Đã sửa khớp với Java
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Đăng nhập
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/login", // ✅ Đã sửa khớp với Java
        method: "POST",
        body,
      }),
    }),

    // Quên mật khẩu (Tạm giữ nguyên)
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/user/forgot-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),

    // Lấy thông tin User (Profile)
    persistLogin: builder.query({
      query: () => ({
        url: "/user/profile", // ✅ Đã sửa khớp với Java (UserController)
        method: "GET",
        headers: {
          // 🔥 FIX: Lấy token từ localStorage (tên key là 'token')
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  usePersistLoginQuery,
} = authApi;