import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap"; // Dùng Form của Bootstrap
import Banner from "../components/Banner/Banner";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import "../styles/login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ username, email, password });
      setLoading(false);
      toast.success("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      // Hiển thị lỗi chi tiết từ Backend (VD: "Username already exists")
      const message = error.response?.data?.message || error.message || "Đăng ký thất bại.";
      toast.error(message);
    }
  };

  return (
    <>
    <Banner title="Đăng Ký" />
    
    <section className="login_section">
      <Container>
        <Row>
          <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Tạo Tài Khoản Mới</h3>

            <Form className="auth__form" onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <button type="submit" className="auth__btn" disabled={loading}>
                {loading ? "Đang xử lý..." : "Đăng Ký"}
              </button>

              <p className="mt-4">
                Đã có tài khoản? <Link to="/login" style={{color: "#0f3460", fontWeight: "bold"}}>Đăng Nhập</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
};

export default Register;