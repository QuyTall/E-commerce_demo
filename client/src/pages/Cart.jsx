import { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { addToCart, decreaseQty, deleteProduct } from "../app/features/cart/cartSlice";

// 👇 KHAI BÁO IP SERVER
const API_URL = "http://100.26.182.209:8080/api/orders";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const totalPrice = cartList.reduce((price, item) => price + item.qty * item.price, 0);

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      toast.warning("Vui lòng đăng nhập để thanh toán!");
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userString);

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.warning("Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    const orderData = {
      userId: user.id,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      totalPrice: totalPrice,
      orderItems: cartList.map(item => ({
        productId: item.id,
        quantity: item.qty,
        price: item.price
      }))
    };

    try {
      // 👇 SỬA LẠI CHỖ NÀY: Dùng IP Server thay vì localhost
      await axios.post(API_URL, orderData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success("Đặt hàng thành công!");
      navigate("/shop");
    } catch (error) {
      console.error(error);
      toast.error("Đặt hàng thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <>
      <Banner title="Cart" />
      <section className="cart-items">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {cartList.length === 0 && (
                <div className="text-center">
                  <h1 className="no-items product">Giỏ hàng đang trống</h1>
                  <Link to="/shop" className="btn btn-primary mt-3">
                    Mua sắm ngay
                  </Link>
                </div>
              )}

              {cartList.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div className="cart-list" key={item.id}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img src={item.imgUrl} alt={item.productName} />
                      </Col>

                      <Col sm={8} md={9}>
                        <Row className="cart-content justify-content-center">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{item.productName}</h3>
                            <h4>
                              {item.price} × {item.qty}
                              <span>{productQty}</span>
                            </h4>
                          </Col>

                          <Col xs={12} sm={3} className="cartControl">
                            <button
                              className="incCart"
                              onClick={() => dispatch(addToCart({ product: item, num: 1 }))}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>

                            <button
                              className="desCart"
                              onClick={() => dispatch(decreaseQty(item))}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </Col>
                        </Row>
                      </Col>

                      <button
                        className="delete"
                        onClick={() => dispatch(deleteProduct(item))}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </Row>
                  </div>
                );
              })}
            </Col>

            <Col md={4}>
              <div className="cart-total">
                <h2>Tổng đơn hàng</h2>
                <div className="d_flex">
                  <h4>Tổng tiền:</h4>
                  <h3>{totalPrice} VND</h3>
                </div>
                
                {cartList.length > 0 && (
                  <div className="mt-4">
                    <h5>Thông tin giao hàng:</h5>
                    <Form.Group className="mb-2">
                      <Form.Control 
                        type="text" 
                        placeholder="Họ tên người nhận" 
                        name="name" 
                        value={customerInfo.name} 
                        onChange={handleInputChange} 
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Control 
                        type="text" 
                        placeholder="Số điện thoại" 
                        name="phone" 
                        value={customerInfo.phone} 
                        onChange={handleInputChange} 
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control 
                        as="textarea" 
                        rows={2} 
                        placeholder="Địa chỉ giao hàng" 
                        name="address" 
                        value={customerInfo.address} 
                        onChange={handleInputChange} 
                      />
                    </Form.Group>

                    <button 
                      className="btn btn-primary w-100" 
                      onClick={handleCheckout}
                    >
                      Thanh Toán
                    </button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cart;