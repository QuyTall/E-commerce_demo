import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice"; // Đảm bảo import đúng đường dẫn
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Banner from "../components/Banner/Banner"; // Thêm Banner cho đẹp

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Tính tổng tiền
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- XỬ LÝ THANH TOÁN (CHECKOUT) ---
  const handleCheckout = async () => {
    // 1. Kiểm tra đăng nhập
    const userString = localStorage.getItem("user");
    if (!userString) {
      toast.warning("Vui lòng đăng nhập để thanh toán!");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userString);

    // 2. Chuẩn bị dữ liệu gửi về Backend (OrderController)
    const orderData = {
      userId: user.id, // ID lấy từ localStorage khi đăng nhập
      totalPrice: totalPrice,
      orderItems: cartList.map(item => ({
          productId: item.id,
          quantity: item.qty,
          price: item.price
      }))
    };

    // 3. Gọi API tạo đơn hàng
    try {
      // Giả sử API endpoint là /api/orders
      await axios.post("http://localhost:8080/api/orders", orderData, {
         headers: {
             Authorization: `Bearer ${user.token}` // Gửi kèm token nếu backend yêu cầu bảo mật
         }
      });
      
      toast.success("Đặt hàng thành công! Cảm ơn bạn.");
      // Tùy chọn: Xóa giỏ hàng sau khi mua (cần thêm action clearCart vào slice)
      // dispatch(clearCart()); 
      navigate("/shop");
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      toast.error("Đặt hàng thất bại. Vui lòng thử lại!");
    }
  };

  // Hàm format tiền tệ (VND)
  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
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
                  <Link to="/shop" className="btn btn-primary mt-3">Mua sắm ngay</Link>
              </div>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            {formatPrice(item.price)} * {item.qty}
                            <span>{formatPrice(productQty)}</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
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
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>{formatPrice(totalPrice)}</h3>
              </div>
              
              {/* Nút Checkout */}
              {cartList.length > 0 && (
                  <button 
                    className="btn btn-primary w-100 mt-3" 
                    style={{padding: "10px", fontSize: "1.1rem", borderRadius: "5px"}}
                    onClick={handleCheckout}
                  >
                    Thanh Toán Ngay
                  </button>
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