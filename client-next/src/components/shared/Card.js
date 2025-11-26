"use client";

import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsCart2, BsEye } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAddToCartMutation } from "@/services/cart/cartApi"; // 👇 Import API giỏ hàng

const Card = ({ product }) => {
  // 👇 1. Gọi Hook thêm giỏ hàng
  const [addToCart, { isLoading, data, error }] = useAddToCartMutation();

  // 👇 2. Xử lý dữ liệu hiển thị an toàn
  const title = product?.title || product?.name || "Sản phẩm chưa đặt tên";
  const price = product?.price || 0;
  const id = product?._id || product?.id;
  
  // Logic lấy ảnh: Ưu tiên ảnh Java -> ảnh Nextjs -> ảnh mẫu
  const imageUrl = product?.image || product?.thumbnail?.url || product?.thumbnail || "https://via.placeholder.com/300x300?text=No+Image";

  // 👇 3. Lắng nghe kết quả từ Server để báo tin vui/buồn
  useEffect(() => {
    if (isLoading) {
        toast.dismiss(); // Xóa thông báo cũ
        toast.loading("Đang thêm vào giỏ...", { id: "card-add" });
    }
    if (data) {
        toast.success("Thêm thành công!", { id: "card-add" });
    }
    if (error) {
        toast.error("Lỗi! Vui lòng đăng nhập.", { id: "card-add" });
    }
  }, [isLoading, data, error]);

  // 👇 4. Hàm xử lý khi bấm nút Giỏ hàng
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Chặn click lan ra ngoài (để không nhảy trang chi tiết)
    e.preventDefault();
    
    if (!id) return toast.error("Lỗi ID sản phẩm!");

    // Gọi API gửi lên Java
    addToCart({
        productId: id,
        quantity: 1
    });
  };

  return (
    <Link 
      href={`/product?product_id=${id}`} 
      className="group flex flex-col h-full border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* --- KHUNG ẢNH --- */}
      <div className="relative h-[250px] w-full bg-gray-50 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized={true}
        />

        <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md">
          NEW
        </span>

        {/* Nút Add to Cart (Đã gắn hàm handleAddToCart) */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="absolute bottom-3 right-3 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          title="Thêm vào giỏ"
        >
          <BsCart2 size={18} />
        </button>
      </div>

      {/* --- THÔNG TIN --- */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {product?.category?.title || product?.category || "Fashion"}
            </span>
        </div>

        <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-dashed border-gray-200">
          <div className="flex flex-col">
             <span className="text-xs text-gray-400 line-through">${(price * 1.2).toFixed(2)}</span>
             <span className="text-lg font-extrabold text-gray-900">${price}</span>
          </div>
          
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
             <AiFillStar className="text-yellow-500" size={14} /> 
             <span className="text-xs font-bold text-gray-700">4.8</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;