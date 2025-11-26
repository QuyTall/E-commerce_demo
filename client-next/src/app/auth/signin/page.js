"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Spinner from "@/components/shared/Spinner";
import Link from "next/link";
import { useSignInMutation } from "@/services/auth/authApi";
import { toast } from "react-hot-toast";

const Signin = () => {
  const router = useRouter();
  const [signin, { isLoading, data, error }] = useSignInMutation();

  useEffect(() => {
    if (isLoading) toast.loading("Đang đăng nhập...", { id: "signin" });

    if (data) {
      // 👇 QUAN TRỌNG: Lấy token từ cấu trúc trả về của Java
      const token = data?.data?.token || data?.token; 
      
      if (token) {
        toast.success("Đăng nhập thành công!", { id: "signin" });
        localStorage.setItem("token", token); // Lưu đúng tên là 'token'
        setTimeout(() => window.open("/", "_self"), 1000);
      } else {
        toast.error("Không nhận được token!", { id: "signin" });
      }
    }

    if (error) {
      toast.error(error?.data?.message || "Sai tài khoản hoặc mật khẩu!", { id: "signin" });
    }
  }, [isLoading, data, error]);

  const handleSignin = async (e) => {
    e.preventDefault();
    // Gửi username và password sang Java
    signin({ 
        username: e.target.email.value, // Form nhập là email nhưng Backend Java cần key là 'username'
        password: e.target.password.value 
    });
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center px-4 bg-gray-50">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-xl bg-white shadow-lg">
        <div className="text-center mb-4">
           <h2 className="text-2xl font-bold">ĐĂNG NHẬP</h2>
        </div>

        <form className="w-full flex flex-col gap-y-4" onSubmit={handleSignin}>
          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm font-semibold">Tên đăng nhập / Email</span>
            <input type="text" name="email" id="email" placeholder="Nhập tài khoản..." className="p-3 border rounded" required />
          </label>

          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm font-semibold">Mật khẩu</span>
            <input type="password" name="password" id="password" placeholder="******" className="p-3 border rounded" required />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50 flex justify-center"
          >
            {isLoading ? <Spinner /> : "ĐĂNG NHẬP"}
          </button>
        </form>

        <div className="flex justify-between text-xs mt-2">
          <Link href="/auth/signup" className="text-blue-600 font-bold">Tạo tài khoản mới</Link>
          <Link href="#" className="text-gray-500">Quên mật khẩu?</Link>
        </div>
      </div>
    </section>
  );
};

export default Signin;