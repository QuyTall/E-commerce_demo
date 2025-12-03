import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../components/Banner/Banner";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { fetchProductsFromAPI } from "../services/api"; // Import API Backend

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Cuộn lên đầu trang khi vào
  useWindowScrollToTop();

  // --- GỌI API BACKEND ---
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductsFromAPI();
        setAllProducts(data);
        setProductsData(data); // Ban đầu hiển thị tất cả
      } catch (error) {
        console.log("Lỗi tải API:", error);
      }
    };
    getData();
  }, []);

  // --- LOGIC LỌC SẢN PHẨM ---
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    
    if (filterValue === "Filter By Category") {
        setProductsData(allProducts);
        return;
    }

    // Lọc theo danh mục (category)
    // Lưu ý: Đảm bảo category trong database backend khớp với các value bên dưới
    const filteredProducts = allProducts.filter(
        (item) => item.category === filterValue
    );
    setProductsData(filteredProducts);
  };

  // --- LOGIC TÌM KIẾM ---
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = allProducts.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  return (
    <> 
      {/* Banner đầu trang */}
      <Banner title="Product Shop" />
      
      {/* Thanh Công Cụ (Lọc & Tìm kiếm) */}
      <section className="filter-bar">
        <Container>
          <Row className="justify-content-center">
            {/* Bộ lọc danh mục */}
            <Col md={4}>
              <div className="filter__widget">
                <select onChange={handleFilter} className="form-select">
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            
            {/* Thanh tìm kiếm */}
            <Col md={8}>
              <div className="search__box">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    onChange={handleSearch} 
                    className="form-control"
                    style={{ paddingRight: '40px' }} 
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Danh sách sản phẩm */}
      <section className="pt-0">
        <Container>
          {productsData.length === 0 ? (
            <h1 className="text-center fs-4 mt-5">Đang tải sản phẩm hoặc không tìm thấy...</h1>
          ) : (
            <ShopList productItems={productsData} />
          )}
        </Container>
      </section>
    </>
  );
};

export default Shop;