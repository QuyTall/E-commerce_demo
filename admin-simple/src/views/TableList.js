import React, { useState, useEffect } from "react";
import axios from "axios";
// 👇 Import thêm Form, Button để làm giao diện nhập liệu
import { Card, Table, Container, Row, Col, Form, Button } from "react-bootstrap";

function TableList() {
  // 1. DANH SÁCH SẢN PHẨM
  const [products, setProducts] = useState([]);
  
  // 2. TRẠNG THÁI FORM (Đang thêm hay đang sửa?)
  const [isEditing, setIsEditing] = useState(false); 
  const [currentId, setCurrentId] = useState(null);  

  // 3. DỮ LIỆU TRONG FORM NHẬP
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    brand: "",
    image: "",
    description: ""
  });

  // Lấy Token để chứng minh là Admin (Bắt buộc có cái này mới Sửa/Xoá được)
  const token = localStorage.getItem("token");
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // --- CÁC HÀM LOGIC ---

  // A. Tải danh sách từ Java về
  const loadProducts = () => {
    axios.get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi load:", err));
  };

  // Chạy ngay khi mở trang
  useEffect(() => {
    loadProducts();
  }, []);

  // B. Khi bạn gõ phím vào ô Input -> Cập nhật formData
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // C. Khi bấm nút LƯU (Xanh lá hoặc Vàng)
  const handleSave = (e) => {
    e.preventDefault();

    if (isEditing) {
      // ---> NẾU ĐANG SỬA (GỌI PUT)
      axios.put(`http://localhost:8080/api/products/${currentId}`, formData, authConfig)
        .then(() => {
          alert("Đã cập nhật thành công!");
          resetForm();
          loadProducts();
        })
        .catch((err) => alert("Lỗi cập nhật (Kiểm tra lại token)!"));
    } else {
      // ---> NẾU ĐANG THÊM MỚI (GỌI POST)
      axios.post("http://localhost:8080/api/products", formData, authConfig)
        .then(() => {
          alert("Thêm mới thành công!");
          resetForm();
          loadProducts();
        })
        .catch((err) => alert("Lỗi thêm mới!"));
    }
  };

  // D. Khi bấm nút SỬA (Màu cam) trên bảng
  const handleEditClick = (product) => {
    setIsEditing(true); // Bật chế độ sửa
    setCurrentId(product.id || product._id);
    // Đổ dữ liệu cũ lên Form
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock || product.countInStock,
      brand: product.brand || "",
      image: product.image || "",
      description: product.description || ""
    });
    // Cuộn lên đầu để sửa cho dễ
    window.scrollTo(0, 0);
  };

  // E. Khi bấm nút XOÁ (Màu đỏ)
  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xoá sản phẩm này chứ?")) {
      axios.delete(`http://localhost:8080/api/products/${id}`, authConfig)
        .then(() => {
          loadProducts(); // Load lại bảng để thấy nó mất đi
        })
        .catch(() => alert("Không thể xoá!"));
    }
  };

  // F. Reset Form về ban đầu
  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: "", price: "", stock: "", brand: "", image: "", description: "" });
  };

  return (
    <Container fluid>
      {/* --- PHẦN 1: FORM QUẢN LÝ --- */}
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                {isEditing ? `Đang Sửa Sản Phẩm ID: ${currentId}` : "Thêm Sản Phẩm Mới"}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSave}>
                <Row>
                  <Col md="4">
                    <label>Tên sản phẩm</label>
                    <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                  </Col>
                  <Col md="2">
                    <label>Giá ($)</label>
                    <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required />
                  </Col>
                  <Col md="2">
                    <label>Tồn kho</label>
                    <Form.Control name="stock" type="number" value={formData.stock} onChange={handleChange} />
                  </Col>
                  <Col md="4">
                    <label>Thương hiệu</label>
                    <Form.Control name="brand" value={formData.brand} onChange={handleChange} placeholder="Apple, Nike..." />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md="12">
                    <label>Link Ảnh (URL)</label>
                    <Form.Control name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md="12">
                    <label>Mô tả</label>
                    <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
                  </Col>
                </Row>
                <Row className="mt-4">
                   <Col md="12">
                      <Button type="submit" variant={isEditing ? "warning" : "success"} className="btn-fill">
                        {isEditing ? "Cập Nhật Ngay" : "Thêm Mới Ngay"}
                      </Button>
                      {isEditing && (
                        <Button variant="secondary" className="btn-fill ml-2" onClick={resetForm}>Hủy Bỏ</Button>
                      )}
                   </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- PHẦN 2: BẢNG DANH SÁCH --- */}
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Kho Hàng Hiện Tại</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Ảnh</th>
                    <th className="border-0">Tên</th>
                    <th className="border-0">Giá</th>
                    <th className="border-0">Kho</th>
                    <th className="border-0">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id || item._id}>
                      <td>{item.id || item._id}</td>
                      <td>
                        <img src={item.image} alt="" style={{width: "50px", height: "50px", objectFit: "cover"}} />
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>{item.stock || item.countInStock}</td>
                      <td>
                        {/* Nút SỬA */}
                        <Button 
                          variant="warning" size="sm" className="mr-2"
                          onClick={() => handleEditClick(item)}
                        >
                          Sửa
                        </Button>
                        {/* Nút XOÁ */}
                        <Button 
                          variant="danger" size="sm" 
                          onClick={() => handleDelete(item.id || item._id)}
                        >
                          Xoá
                        </Button>
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

export default TableList;