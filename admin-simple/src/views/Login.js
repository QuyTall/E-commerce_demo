import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username: username,
        password: password
      });

      const data = res.data.data || res.data.result;

      if (data && data.token) {
        // Kiểm tra quyền Admin
        if (data.role !== "ADMIN" && data.role !== "ROLE_ADMIN") {
            setError("bạn iu sai rồi"); // <--- SỬA THEO Ý BẠN
            localStorage.removeItem("token");
            return;
        }

        // Đăng nhập thành công
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        
        alert("Chào mừng Sếp quay trở lại! 🫡");
        history.push("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      // Bắt mọi lỗi (sai pass, lỗi mạng, lỗi server) đều hiện câu này
      setError("bạn iu sai rồi"); // <--- SỬA THEO Ý BẠN
    }
  };

  return (
    <div className="content">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Row>
          <Col>
            <Card style={{ width: "400px", padding: "20px", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}>
              <Card.Body>
                <h3 className="text-center mb-4 font-weight-bold">ADMIN PORTAL</h3>
                
                {/* Hiển thị thông báo lỗi */}
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tài khoản</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Nhập username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} 
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Nhập password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                    />
                  </Form.Group>

                  <Button className="w-100 btn-fill" type="submit" variant="info" size="lg">
                    Đăng Nhập
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;