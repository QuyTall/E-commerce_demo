import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

// 👇 KHAI BÁO IP SERVER
const API_BASE_URL = "http://100.26.182.209:8080/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0
  });

  const [newProducts, setNewProducts] = useState([]);
  const token = localStorage.getItem("token");
  
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    // 1. GỌI API LẤY SỐ LIỆU (Đã sửa IP)
    axios.get(`${API_BASE_URL}/dashboard/stats`, authConfig)
      .then(res => {
        setStats(prev => ({...prev, ...res.data}));
      })
      .catch(err => console.error("Lỗi lấy stats:", err));

    // 2. GỌI API LẤY SẢN PHẨM MỚI (Đã sửa IP)
    axios.get(`${API_BASE_URL}/products`, authConfig)
      .then(res => {
        if(res.data && res.data.length > 0) {
            setNewProducts(res.data.slice(0, 5));
        }
      })
      .catch(err => console.error("Lỗi lấy sản phẩm:", err));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-backpack text-warning"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Sản Phẩm</p>
                    <Card.Title as="h4">{stats.totalProducts}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-sync-alt"></i> Cập nhật liên tục
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-single-02 text-success"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Khách Hàng</p>
                    <Card.Title as="h4">{stats.totalUsers}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="far fa-calendar-alt"></i> Đã đăng ký
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-cart-simple text-danger"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Đơn Hàng</p>
                    <Card.Title as="h4">{stats.totalOrders || 0}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="far fa-clock"></i> Chờ xử lý
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-money-coins text-primary"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Doanh Thu</p>
                    <Card.Title as="h4">$ 1,345</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo"></i> Tạm tính tháng này
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Biểu Đồ Tăng Trưởng</Card.Title>
              <p className="card-category">Doanh số bán hàng 24h qua</p>
            </Card.Header>
            <Card.Body>
              <div className="ct-chart" id="chartHours">
                <ChartistGraph
                  data={{
                    labels: ["9AM", "12PM", "3PM", "6PM", "9PM", "12AM", "3AM", "6AM"],
                    series: [
                      [287, 385, 490, 492, 554, 586, 698, 695],
                      [67, 152, 143, 240, 287, 335, 435, 437],
                      [23, 113, 67, 108, 190, 239, 307, 308],
                    ],
                  }}
                  type="Line"
                  options={{
                    low: 0,
                    high: 800,
                    showArea: false,
                    height: "245px",
                    axisX: { showGrid: false },
                    lineSmooth: true,
                    showLine: true,
                    showPoint: true,
                    fullWidth: true,
                    chartPadding: { right: 50 },
                  }}
                />
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="legend">
                <i className="fas fa-circle text-info"></i> Doanh Thu{" "}
                <i className="fas fa-circle text-danger"></i> Lượt Xem{" "}
                <i className="fas fa-circle text-warning"></i> Đơn Hàng
              </div>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-history"></i> Cập nhật 3 phút trước
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Tỷ Lệ Danh Mục</Card.Title>
              <p className="card-category">Phân bố sản phẩm</p>
            </Card.Header>
            <Card.Body>
              <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                <ChartistGraph
                  data={{
                    labels: ["40%", "20%", "40%"],
                    series: [40, 20, 40],
                  }}
                  type="Pie"
                />
              </div>
              <div className="legend">
                <i className="fas fa-circle text-info"></i> Điện thoại{" "}
                <i className="fas fa-circle text-danger"></i> Laptop{" "}
                <i className="fas fa-circle text-warning"></i> Phụ kiện
              </div>
              <hr></hr>
              <div className="stats">
                <i className="far fa-clock"></i> Chiến dịch tháng 11
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Sản Phẩm Mới Nhập Kho</Card.Title>
              <p className="card-category">5 sản phẩm gần nhất</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Hình Ảnh</th>
                    <th className="border-0">Tên Sản Phẩm</th>
                    <th className="border-0">Giá Bán</th>
                    <th className="border-0">Tồn Kho</th>
                  </tr>
                </thead>
                <tbody>
                  {newProducts.length > 0 ? (
                      newProducts.map(item => (
                        <tr key={item.id || item._id}>
                            <td>{item.id || item._id}</td>
                            <td>
                                <img src={item.image} alt="" style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} />
                            </td>
                            <td>{item.name || item.productName}</td>
                            <td>${item.price}</td>
                            <td>{item.stock || item.countInStock || 100}</td>
                        </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan="5" className="text-center">Đang tải dữ liệu...</td>
                      </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;