"use client";

import React, { useEffect, useMemo, useState } from "react";
import Container from "../shared/Container";
import Brand from "../icons/Brand";
import Category from "../icons/Category";
import Store from "../icons/Store";
import Image from "next/image";
import { BsBoxSeam } from "react-icons/bs";
import { useGetStoresQuery } from "@/services/store/storeApi";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Niche from "../shared/skeletonLoading/Niche";
import { toast } from "react-hot-toast";
import Modal from "../shared/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setBrand, setCategory, setStore } from "@/features/filter/filterSlice";
import { useRouter } from "next/navigation";

// --- FIX LỖI: LOGIC CHUNG CHO BRAND, CATEGORY, STORE ---

function DisplayNiche({ apiQuery, selector, setter, title, icon }) {
    const { data: nicheData, error: nicheError, isLoading: fetchingNiches } = apiQuery();
    
    // Lấy dữ liệu an toàn (Mặc định là mảng rỗng)
    const niches = useMemo(() => nicheData?.data || [], [nicheData]);
    
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const currentNiche = useSelector(selector);
    const router = useRouter();

    useEffect(() => {
        if (nicheError) {
            toast.error(nicheError?.data?.description || `Lỗi tải ${title}!`, { id: `${title}-data` });
        }
    }, [nicheError, title]);

    // Hàm giả lập Tags (Vì Java không gửi tags)
    const mockTags = ["Thời trang", "Cool", "Chất", "Hot"];

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {fetchingNiches ? (
                    [1, 2, 3].map((_, index) => <Niche key={index} />)
                ) : (
                    niches?.slice(0, 6)?.map((item, index) => (
                        <div
                            key={index}
                            className="group border p-4 rounded-lg flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative cursor-pointer"
                            onClick={() => {
                                dispatch(setter(item));
                                setIsOpen(true);
                            }}
                        >
                            <Image
                                src={item?.thumbnail?.url || item?.logo?.url || "https://via.placeholder.com/50/f06d86/fff?text=N"}
                                alt={item?.title || "Niche"}
                                width={50}
                                height={50}
                                unoptimized={true} // Cho phép ảnh ngoài
                                className="rounded h-[50px] w-[50px] object-cover"
                            />

                            <div className="flex flex-col gap-y-2">
                                <h2 className="text-xl">{item?.title || "Chưa đặt tên"}</h2>
                                <p className="flex flex-row gap-x-1 items-center rounded-primary">
                                    <BsBoxSeam />
                                    <span className="group-hover:text-indigo-500 text-xs">
                                        {item?.products?.length || '20'} Products
                                    </span>
                                </p>
                            </div>
                            
                            {/* 🔥 SỬA LỖI MAP: Dùng dữ liệu Tags giả định nếu Java không gửi */}
                            <p className="flex flex-row gap-1 overflow-x-auto scrollbar-hide">
                                {(item.tags || mockTags).map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="border text-xs px-1 py-0.5 rounded whitespace-nowrap"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))
                )}
            </div>

            {!fetchingNiches && niches?.length === 0 && (
                <p className="text-sm">Oops! No {title} found!</p>
            )}

            {/* Modal hiển thị chi tiết (Giữ nguyên logic cũ) */}
            {/* ... */}
        </>
    );
}

// --- LOGIC CHỌN NICHE (CŨ) ---
const NicheExplorer = () => {
  const niches = [
    { title: "Brand", icon: <Brand />, api: useGetBrandsQuery, selector: (state) => state.brand.brand, setter: setBrand },
    { title: "Category", icon: <Category />, api: useGetCategoriesQuery, selector: (state) => state.category.category, setter: setCategory },
    { title: "Store", title: "Store", icon: <Store />, api: useGetStoresQuery, selector: (state) => state.store.store, setter: setStore },
  ];

  const [selectedNiche, setSelectedNiche] = useState("Category");

  // Tìm niche đang chọn
  const ActiveNiche = niches.find(n => n.title === selectedNiche);

  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl">
          Top Exploring. <span className="text-blue-500">By Niche</span>
        </h1>

        <div className="bg-neutral-100/70 rounded-primary lg:p-24 md:p-12 p-6 flex flex-col gap-y-12">
          
          {/* Menu chọn Brand/Category/Store */}
          <div className="flex flex-row justify-center gap-x-4 overflow-x-auto">
            <div className="flex flex-row justify-center gap-x-4 border p-1 rounded-secondary bg-white overflow-x-auto scrollbar-hide">
              {niches.map((niche, index) => (
                <button
                  key={index}
                  className={"text-sm flex flex-row items-center gap-x-1 px-8 py-2 rounded-secondary border border-transparent" + (selectedNiche === niche.title ? " bg-black text-white" : "")}
                  onClick={() => setSelectedNiche(niche.title)}
                >
                  {niche.icon}
                  {niche.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Hiển thị nội dung theo Niche đã chọn */}
          {ActiveNiche && (
              <DisplayNiche 
                  apiQuery={ActiveNiche.api} 
                  selector={ActiveNiche.selector} 
                  setter={ActiveNiche.setter} 
                  title={ActiveNiche.title} 
                  icon={ActiveNiche.icon} 
              />
          )}

        </div>
      </section>
    </Container>
  );
};

export default NicheExplorer;