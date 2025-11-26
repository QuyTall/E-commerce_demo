"use client";

import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-hot-toast";

// 👇 FIX 1: IMPORT CÁC COMPONENT CÒN THIẾU
// Bạn phải đảm bảo 2 file này tồn tại trong dự án của bạn (thường là src/components/icons/Bag.jsx và src/components/shared/Spinner.jsx)
import Bag from "../icons/Bag";
import Spinner from "../shared/Spinner"; 
import { useAddToCartMutation } from "@/services/cart/cartApi";


const CartButton = ({ product }) => {
    // FIX 2: Lấy ID sản phẩm an toàn từ prop
    const productId = product?._id || product?.id;
    
    const [qty, setQty] = useState(1);

    const [
        addToCart,
        { isLoading: isCartLoading, data: cartData, error: cartError }, 
    ] = useAddToCartMutation();

    // Xử lý hiệu ứng Toast
    React.useEffect(() => {
        if (isCartLoading) toast.loading("Adding to cart...", { id: "addToCart" });
        if (cartData) {
            toast.success("Added to cart successfully!", { id: "addToCart" });
            setQty(1);
        }
        // Xử lý lỗi API (nếu Java trả về lỗi)
        if (cartError?.data) {
            toast.error(cartError?.data?.description || "Lỗi thêm giỏ hàng!", { id: "addToCart" });
        }
    }, [isCartLoading, cartData, cartError]);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        
        if (!productId) {
            return toast.error("Không tìm thấy ID sản phẩm.");
        }

        const cartRequest = {
            productId: productId,
            quantity: qty
        };

        addToCart(cartRequest);
    };

    return (
        <section className="flex flex-row items-center gap-x-4">
            {/* PHẦN TĂNG GIẢM SỐ LƯỢNG */}
            <div className="flex flex-row gap-x-2 items-center border px-1 py-0.5 rounded-secondary h-full">
                <button
                    className="border border-black/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
                    onClick={() => setQty(qty - 1)}
                    disabled={qty === 1}
                >
                    <AiOutlineMinus className="w-4 h-4" />
                </button>
                <span className="px-2 py-0.5 rounded-primary border w-12 inline-block text-center">
                    {qty}
                </span>
                <button
                    className="border border-black/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
                    onClick={() => setQty(qty + 1)}
                >
                    <AiOutlinePlus className="w-4 h-4" />
                </button>
            </div>
            {/* NÚT ADD TO CART */}
            <button
                className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
                disabled={qty === 0 || isCartLoading} 
                onClick={handleAddToCart} 
            >
                {/* HIỂN THỊ SPINNER KHI LOADING */}
                {isCartLoading ? ( 
                    <Spinner /> 
                ) : (
                    <>
                        <Bag /> Thêm vào giỏ
                    </>
                )}
            </button>
        </section>
    );
};

export default CartButton;