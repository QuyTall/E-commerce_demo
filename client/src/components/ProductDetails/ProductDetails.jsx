import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap"; // Dùng react-bootstrap
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Cần npm install framer-motion

// SỬA ĐƯỜNG DẪN IMPORT CHÍNH XÁC:
import { addToCart } from "../../app/features/cart/cartSlice"; // Đúng path tới cartSlice của bạn
import { fetchProductById } from "../../services/api"; // Đúng path tới api
import Banner from "../Banner/Banner"; // Dùng Banner thay CommonSection
import "./product-details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // Gọi API lấy chi tiết sản phẩm
  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  const addItem = () => {
    dispatch(
      addToCart({
        product: {
            id: product.id,
            productName: product.productName,
            price: product.price,
            imgUrl: product.imgUrl
        },
        num: parseInt(quantity) // Đảm bảo số lượng là số
      })
    );
    toast.success("Product added successfully");
  };

  // Nếu chưa có dữ liệu thì hiện loading
  if (!product) return <h4 className="text-center mt-5">Loading details...</h4>;

  return (
    <>
      <Banner title={product.productName} />
      
      <section className="pt-0 mt-5">
        <Container>
          <Row>
            <Col md={6}>
              <img src={product.imgUrl} alt="" className="img-fluid" />
            </Col>
            
            <Col md={6}>
              <div className="product__details">
                <h2>{product.productName}</h2>
                
                <div className="product__rating d-flex align-items-center gap-3 mb-3">
                  <div>
                    <span><i className="fa fa-star" style={{color: "orange"}}></i></span>
                    <span><i className="fa fa-star" style={{color: "orange"}}></i></span>
                    <span><i className="fa fa-star" style={{color: "orange"}}></i></span>
                    <span><i className="fa fa-star" style={{color: "orange"}}></i></span>
                    <span><i className="fa fa-star-half" style={{color: "orange"}}></i></span>
                  </div>
                  <p>(<span>{product.avgRating || 4.5}</span> ratings)</p>
                </div>

                <div className="d-flex align-items-center gap-5">
                   <span className="product__price fs-3 fw-bold">${product.price}</span>
                   <span>Category: {product.category.toUpperCase()}</span>
                </div>
                
                <p className="mt-3">{product.shortDesc}</p>

                <div className="mt-4 d-flex align-items-center gap-3">
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e)=>setQuantity(e.target.value)}
                        min="1"
                        style={{width: "70px", padding: "5px 10px"}}
                    />
                    <motion.button 
                        whileTap={{ scale: 1.1 }} 
                        className="btn btn-dark" // Dùng class bootstrap
                        onClick={addItem}
                    >
                      Add to Cart
                    </motion.button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;