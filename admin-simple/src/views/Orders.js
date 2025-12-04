import React, { useEffect, useState } from "react";
import { Card, Table, Container, Row, Col, Button, Badge } from "react-bootstrap";
import axios from "axios";

// 👇 KHAI BÁO IP SERVER
const API_BASE_URL = "http://100.26.182.209:8080/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Load đơn hàng (Đã sửa IP)
  const loadOrders = () => {
    axios.get(`${API_BASE_URL}/orders`, config)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Duyệt đơn (Đã sửa IP)
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/orders/${orderId}`, { status: newStatus }, config);
      
      alert("Cập nhật trạng thái thành công!");
      loadOrders(); 
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Quản Lý Đơn Hàng</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Khách Hàng</th>
                    <th>SĐT</th>
                    <th>Địa Chỉ</th>
                    <th>Tổng Tiền</th>
                    {/* <th>Ngày Đặt</th> */ }
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.phone}</td>
                      <td>{order.address}</td>
                      <td>${order.totalPrice}</td>
                      {/* <td>{order.orderDate}</td> */}
                      <td>
                        {order.status === "PENDING" ? 
                          <Badge bg="warning" text="dark">Chờ xử lý</Badge> : 
                          <Badge bg="success">Đã giao</Badge>
                        }
                      </td>
                      <td>
                        {order.status === "PENDING" && (
                          <Button size="sm" variant="primary" onClick={() => handleUpdateStatus(order.id, "SHIPPED")}>
                            Giao Hàng
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Orders;