import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gọi API Backend
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username: username,
        password: password
      });

      // Backend của bạn trả về: { code: 1000, result: { token: "..." } } hoặc { data: { token: "..." } }
      // Mình lấy an toàn cả 2 trường hợp
      const data = res.data.data || res.data.result;

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        alert("Đăng nhập thành công! Chào mừng Admin.");
        window.location.href = "/admin/dashboard"; // Chuyển vào trang chủ
      }
    } catch (error) {
      alert("Sai tài khoản hoặc mật khẩu rồi bạn iu ơi!");
      console.error(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Row>
        <Col>
          <Card style={{ width: "400px", padding: "30px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <h3 className="text-center mb-4">Admin Portal</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nhập username" 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Nhập password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </Form.Group>
              <Button className="w-100 btn-fill" type="submit" variant="primary">
                Đăng Nhập
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;