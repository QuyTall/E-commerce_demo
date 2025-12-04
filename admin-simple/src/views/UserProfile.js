import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

// 👇 KHAI BÁO IP SERVER
const API_BASE_URL = "http://100.26.182.209:8080/api";

function UserProfile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    password: "" 
  });

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // 1. Load thông tin (Đã sửa IP)
  useEffect(() => {
    axios.get(`${API_BASE_URL}/user/profile`, config)
      .then((res) => {
        setUser({ ...res.data, password: "" });
      })
      .catch((err) => console.error(err));
  }, []);

  // 2. Xử lý nhập liệu
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 3. Gửi cập nhật (Đã sửa IP)
  const handleUpdate = (e) => {
    e.preventDefault();
    
    const dataToSend = {
        email: user.email,
        password: user.password ? user.password : null 
    };

    axios.put(`${API_BASE_URL}/user/profile`, dataToSend, config)
      .then(() => {
        alert("✅ Cập nhật thành công! Vui lòng đăng nhập lại nếu đổi mật khẩu.");
        if(user.password) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
      })
      .catch((err) => alert("❌ Lỗi cập nhật: " + err.message));
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Chỉnh Sửa Hồ Sơ</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdate}>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Tài khoản (Username)</label>
                      <Form.Control defaultValue={user.username} disabled type="text"></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <Form.Control placeholder="Email" type="email" name="email" value={user.email} onChange={handleChange}></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Chức vụ</label>
                      <Form.Control defaultValue={user.role} disabled type="text"></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                    <Col md="12">
                        <hr />
                        <label style={{color: 'red'}}>Đổi Mật Khẩu (Bỏ trống nếu không đổi)</label>
                        <Form.Control placeholder="Nhập mật khẩu mới..." type="password" name="password" value={user.password} onChange={handleChange}></Form.Control>
                    </Col>
                </Row>

                <Button className="btn-fill pull-right mt-3" type="submit" variant="info">
                  Lưu Thay Đổi
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;