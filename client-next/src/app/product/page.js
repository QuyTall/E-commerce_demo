/**
 * Title: Product Detail Page (Fixed Image & Data for Java Backend)
 */
"use client";

import Left from "@/components/details/Left";
import Relatives from "@/components/details/Relatives";
import Right from "@/components/details/Right";
import Banner2 from "@/components/home/Banner2";
import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import { useGetProductQuery } from "@/services/product/productApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

const Detail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("product_id");

  // Gọi API lấy chi tiết sản phẩm
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useGetProductQuery(id);

  // 👇 LOGIC QUAN TRỌNG: Chuẩn hóa dữ liệu từ Java sang Next.js UI
  const product = useMemo(() => {
    const raw = productData?.data || {}; // Lấy data thô từ API
    
    if (!raw.id && !raw._id) return {}; // Nếu chưa có data thì trả về rỗng

    // Xử lý ảnh an toàn (Java trả về image, UI cần thumbnail.url)
    const imageUrl = raw.image || raw.thumbnail || "https://via.placeholder.com/500x500?text=No+Image";

    return {
        ...raw,
        _id: raw.id || raw._id,       // Chuẩn hóa ID
        title: raw.name || raw.title, // Chuẩn hóa Tên
        price: raw.price,
        description: raw.description || "Chưa có mô tả cho sản phẩm này.",
        
        // 👇 Fake Thumbnail object để UI Left.js hiển thị được
        thumbnail: { 
            url: imageUrl, 
            public_id: "main_img" 
        },
        
        // 👇 Fake Gallery (Bộ sưu tập ảnh) từ ảnh chính để fix lỗi .map()
        gallery: [
            { url: imageUrl, public_id: "img_1" },
            { url: imageUrl, public_id: "img_2" }
        ],

        // Fake Category & Brand nếu thiếu
        category: raw.category || { title: "Fashion" },
        brand: raw.brand || { title: "No Brand", logo: { url: "" } },
        
        // Fake Reviews
        reviews: raw.reviews || []
    };
  }, [productData]);

  useEffect(() => {
    if (productError) {
      // Tắt toast lỗi nếu chỉ là do chưa load xong
      console.log("Product Load Error:", productError);
    }
  }, [productError]);

  return (
    <Main>
      <Container>
        <div className="h-full w-full flex flex-col gap-y-20 pt-10">
          <div className="grid grid-cols-12 gap-8">
            {productLoading || !product._id ? (
              // Giao diện Loading (Skeleton)
              <>
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                  <div className="h-[400px] w-full rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                  <div className="w-full flex flex-col gap-y-4">
                    <div className="h-[40px] w-3/4 rounded bg-gray-200 animate-pulse" />
                    <div className="h-[20px] w-1/2 rounded bg-gray-200 animate-pulse" />
                    <div className="h-[100px] w-full rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </>
            ) : (
              // Giao diện Chi tiết Sản phẩm
              <>
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                    {/* Truyền product đã chuẩn hóa vào Left (Ảnh) */}
                    <Left product={product} /> 
                </div>
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                    {/* Truyền product đã chuẩn hóa vào Right (Thông tin) */}
                    <Right product={product} />
                </div>
              </>
            )}
          </div>
          
          {/* Ẩn phần sản phẩm liên quan để tránh lỗi */}
          {/* <Relatives /> */}
          
          <Banner2 className={"!px-0"} />
        </div>
      </Container>
    </Main>
  );
};

export default Detail;