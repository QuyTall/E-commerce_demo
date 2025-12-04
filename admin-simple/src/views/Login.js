import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// ❌ BỎ axios
// import axios from "axios";

// ✅ Chỉ lùi 1 cấp (vì Login.js nằm trong src/pages)
import { authAPI } from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 👇 Gọi đúng từ authAPI thay axios
      const res = await authAPI.login({
        username: username,
        password: password,
      });

      const data = res.data.data || res.data.result;

      if (data && data.token) {
        // 🔐 Kiểm tra quyền
        if (data.role !== "ADMIN" && data.role !== "ROLE_ADMIN") {
          setError("bạn iu sai rồi");
          localStorage.removeItem("token");
          return;
        }

        // 🎯 Đăng nhập OK
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));

        alert("Chào mừng Sếp quay trở lại! 🫡");
        history.push("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("bạn iu sai rồi (hoặc Server chưa chạy)");
    }
  };

  return (
    <div className="content">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Row>
          <Col>
            <Card
              style={{
                width: "400px",
                padding: "20px",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)",
              }}
            >
              <Card.Body>
                <h3 className="text-center mb-4 font-weight-bold">
                  ADMIN PORTAL
                </h3>

                {/* 🔥 Hiển thị lỗi */}
                {error && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}

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

                  <Button
                    className="w-100 btn-fill"
                    type="submit"
                    variant="info"
                    size="lg"
                  >
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
