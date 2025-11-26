"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSignUpMutation } from "@/services/auth/authApi";
import Spinner from "@/components/shared/Spinner";

const Signup = () => {
  const router = useRouter();
  const [signup, { isLoading, data, error }] = useSignUpMutation();

  useEffect(() => {
    if (isLoading) toast.loading("Đang tạo tài khoản...", { id: "signup" });

    if (data) {
      toast.success("Đăng ký thành công!", { id: "signup" });
      setTimeout(() => router.push("/auth/signin"), 1000);
    }

    if (error) {
      toast.error(error?.data?.message || "Đăng ký thất bại!", { id: "signup" });
    }
  }, [isLoading, data, error, router]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Tạo object dữ liệu chuẩn gửi sang Java
    const userData = {
      username: e.target.name.value, // Java cần field 'username'
      email: e.target.email.value,
      password: e.target.password.value,
      role: "USER"
    };

    // Validate password đơn giản
    if (userData.password.length < 6) {
        return toast.error("Mật khẩu phải từ 6 ký tự trở lên");
    }

    signup(userData);
  };

  return (
    <section className="min-w-full min-h-screen flex justify-center items-center p-4 bg-gray-50">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-xl bg-white shadow-lg">
        <div className="flex flex-row items-center gap-x-2 justify-center">
           <h2 className="text-2xl font-bold text-black">ĐĂNG KÝ</h2>
        </div>
        
        <form className="w-full flex flex-col gap-y-4" onSubmit={handleSignup}>
          
          {/* USERNAME */}
          <label htmlFor="name" className="flex flex-col gap-y-1">
            <span className="text-sm font-semibold">Tên đăng nhập *</span>
            <input type="text" name="name" placeholder="Ví dụ: user123" className="p-3 border rounded" required />
          </label>

          {/* EMAIL */}
          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm font-semibold">Email *</span>
            <input type="email" name="email" placeholder="email@example.com" className="p-3 border rounded" required />
          </label>

          {/* PASSWORD */}
          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm font-semibold">Mật khẩu *</span>
            <input type="password" name="password" placeholder="******" className="p-3 border rounded" required />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50 flex justify-center"
          >
            {isLoading ? <Spinner /> : "TẠO TÀI KHOẢN"}
          </button>
        </form>

        <div className="text-center text-sm mt-2">
          Đã có tài khoản? <Link href="/auth/signin" className="text-blue-600 font-bold">Đăng nhập ngay</Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;