import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import Banner from "../components/Banner/Banner";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";

// 🔥 Thêm Redux
import { useDispatch } from "react-redux";
import { loginSuccess } from "../app/features/auth/authSlice";

import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1) Gọi API Backend
      const user = await loginUser(username, password);

      // 2) Đẩy user vào Redux (QUAN TRỌNG)
      dispatch(loginSuccess(user));

      setLoading(false);
      toast.success("Đăng nhập thành công!");

      navigate("/shop");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <>
      <Banner title="Đăng Nhập" />

      <section className="login_section">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Chào mừng trở lại!</h3>

              <Form className="auth__form" onSubmit={signIn}>
                <Form.Group className="mb-3">
                  <input
                    type="text"
                    placeholder="Nhập Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <input
                    type="password"
                    placeholder="Nhập Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <button type="submit" className="auth__btn" disabled={loading}>
                  {loading ? "Đang xử lý..." : "Đăng Nhập"}
                </button>

                <p className="mt-4">
                  Chưa có tài khoản?{" "}
                  <Link
                    to="/signup"
                    style={{ color: "#0f3460", fontWeight: "bold" }}
                  >
                    Tạo tài khoản ngay
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
