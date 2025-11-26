/**
 * Title: Left Component (Fixed Image & Gallery Safety)
 * Updated for: Next.js + Java Compatibility
 */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadImage from "../shared/LoadImage"; // Giữ lại LoadImage nếu bạn có
import DetailCard from "./DetailCard"; // Giữ lại DetailCard nếu bạn có
// ... import các component khác nếu cần

const Left = ({ product }) => {
  // Lấy dữ liệu Gallery đã được biến đổi ở productApi.js
  const galleryImages = product?.gallery || [];
  const totalThumbnails = galleryImages.length;
  
  // 🔥 FIX 1: Lấy URL ảnh chính an toàn
  const mainImageUrl = product?.thumbnail?.url || product?.image || "https://via.placeholder.com/500x500?text=NOVA+STORE";
  
  const productTitle = product?.title || product?.name || "Sản phẩm";
  
  const [selectedImage, setSelectedImage] = useState(mainImageUrl);

  // Cập nhật ảnh chính khi dữ liệu sản phẩm thay đổi
  useEffect(() => {
    setSelectedImage(mainImageUrl);
  }, [product?.id, mainImageUrl]);

  // Hàm tính toán class chia cột (giữ nguyên logic gốc của template)
  function getColumnSpanClass(index, totalThumbnails) {
    if (totalThumbnails === 1) return "col-span-12";
    if (totalThumbnails === 2) return index <= 1 ? "col-span-6" : "col-span-6";
    if (totalThumbnails === 3) return index === 0 ? "col-span-12" : "col-span-6";
    if (totalThumbnails === 4) return "col-span-6";
    if (totalThumbnails === 5) return index <= 1 ? "col-span-6" : "col-span-4";
    return "col-span-6";
  }

  // Chuẩn hóa Hash Tags để không bị lỗi map
  const categoryTags = product?.category?.tags || [];
  const brandTags = product?.brand?.tags || [];
  const storeTags = product?.store?.tags || [];

  const hashTags = [
    ...categoryTags,
    ...brandTags,
    ...storeTags,
  ].filter((tag) => tag !== undefined && tag !== null);


  return (
    <section className="lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        {/* 1. KHU VỰC ẢNH CHÍNH (MAIN IMAGE) */}
        <div className="relative h-[500px] w-full border rounded-primary overflow-hidden bg-gray-100">
            <Image
              src={selectedImage}
              alt={productTitle}
              fill
              className="object-cover"
              unoptimized={true} // Cho phép ảnh ngoài
            />
        </div>
        
        {/* 2. KHU VỰC THUMBNAIL (GALLERY) */}
        <div className="flex flex-row gap-x-2 overflow-x-auto scrollbar-hide">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`relative h-[80px] w-[80px] border rounded-lg cursor-pointer transition-colors ${
                selectedImage === img.url ? "border-black" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(img.url)}
            >
              {/* Sử dụng LoadImage nếu có, không thì dùng Image trực tiếp */}
              <Image
                src={img.url}
                alt={`${productTitle} - Thumbnail ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                unoptimized={true}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* 3. THÔNG TIN PHỤ & HASHTAGS */}
      <article className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2.5">
          
          {/* DETAIL CARD (Giả định DetailCard tồn tại) */}
          <DetailCard
            title={`Từ Danh Mục: ${product?.category?.title || 'Chung'}`}
            content={product?.category?.keynotes || ['Sản phẩm chất lượng cao']}
          />
          <DetailCard
            title={`Từ Thương Hiệu: ${product?.brand?.title || 'Nova'}`}
            content={product?.brand?.keynotes || ['Cam kết hàng chính hãng']}
          />

          {/* HIỂN THỊ HASHTAGS (Đã dùng mảng an toàn) */}
          {hashTags.length > 0 && (
              <div className="flex flex-row flex-wrap gap-1 mt-4">
                {hashTags.map((hashTag, index) => (
                  <span key={index} className="!text-xs border px-2 py-0.5 rounded-sm">{`#${hashTag}`}</span>
                ))}
              </div>
          )}
        </div>
      </article>
    </section>
  );
};

// --- HÀM VÀ COMPONENT PHỤ (Giả định được Import/Định nghĩa) ---
// Nếu bạn gặp lỗi cho các hàm này, bạn cần cung cấp code gốc của chúng.
function Badge({ props, children, className }) {
    return <span className={"px-3 py-1 rounded text-xs w-fit" + (className ? " " + className : "")} {...props}>{children}</span>;
}

export default Left;