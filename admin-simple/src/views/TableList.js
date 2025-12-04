import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

// 👇 KHAI BÁO IP SERVER
const API_BASE_URL = "http://100.26.182.209:8080/api";

function TableList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "", price: "", stock: "", brand: "", category: "", image: "", description: ""
  });

  const token = localStorage.getItem("token");
  const getAuthConfig = () => ({
    headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
  });

  // 1. LOAD DỮ LIỆU (Đã sửa IP)
  const loadProducts = () => {
    axios.get(`${API_BASE_URL}/products`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); 
      })
      .catch((err) => console.error("Lỗi load:", err));
  };

  useEffect(() => { loadProducts(); }, []);

  // 2. XỬ LÝ LỌC DANH MỤC
  useEffect(() => {
      if (categoryFilter === "ALL") {
          setFilteredProducts(products);
      } else {
          setFilteredProducts(products.filter(p => p.category?.toLowerCase().includes(categoryFilter.toLowerCase())));
      }
  }, [categoryFilter, products]);


  // 3. CÁC HÀM XỬ LÝ FORM (Đã sửa IP)
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0
    };

    try {
        if (isEditing) {
            await axios.put(`${API_BASE_URL}/products/${currentId}`, payload, getAuthConfig());
            alert("✅ Cập nhật thành công!");
        } else {
            await axios.post(`${API_BASE_URL}/products`, payload, getAuthConfig());
            alert("✅ Thêm mới thành công!");
        }
        resetForm();
        loadProducts();
    } catch (err) {
        alert("❌ Lỗi: " + (err.response?.data?.message || "Kiểm tra dữ liệu!"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;
    try {
        await axios.delete(`${API_BASE_URL}/products/${id}`, getAuthConfig());
        alert("🗑️ Đã xóa!");
        loadProducts();
    } catch (err) {
        alert("❌ Lỗi xóa!");
    }
  };

  const handleEditClick = (p) => {
    setIsEditing(true);
    setCurrentId(p.id || p._id);
    setFormData({
      name: p.name, price: p.price, stock: p.stock || 0,
      brand: p.brand || "", category: p.category || "", 
      image: p.image || "", description: p.description || ""
    });
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: "", price: "", stock: "", brand: "", category: "", image: "", description: "" });
  };

  return (
    <Container fluid>
      {/* FORM NHẬP LIỆU */}
      <Row>
        <Col md="12">
          <Card>
            <Card.Header><Card.Title as="h4">{isEditing ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</Card.Title></Card.Header>
            <Card.Body>
              <Form onSubmit={handleSave}>
                <Row>
                  <Col md="6"><Form.Group><label>Tên sản phẩm</label><Form.Control name="name" value={formData.name} onChange={handleChange} required /></Form.Group></Col>
                  <Col md="3"><Form.Group><label>Giá ($)</label><Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required /></Form.Group></Col>
                  <Col md="3"><Form.Group><label>Kho</label><Form.Control name="stock" type="number" value={formData.stock} onChange={handleChange} /></Form.Group></Col>
                </Row>
                <Row>
                  <Col md="4"><Form.Group><label>Thương hiệu</label><Form.Control name="brand" value={formData.brand} onChange={handleChange} /></Form.Group></Col>
                  
                  <Col md="4">
                    <Form.Group>
                        <label>Danh mục (Áo, Quần, Giày...)</label>
                        <Form.Control name="category" value={formData.category} onChange={handleChange} required placeholder="VD: Áo khoác" />
                    </Form.Group>
                  </Col>
                  
                  <Col md="4"><Form.Group><label>Link Ảnh</label><Form.Control name="image" value={formData.image} onChange={handleChange} /></Form.Group></Col>
                </Row>
                <Row><Col md="12"><Form.Group><label>Mô tả</label><Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} /></Form.Group></Col></Row>
                <Button type="submit" className="btn-fill mt-3" variant={isEditing ? "warning" : "success"}>{isEditing ? "Lưu" : "Thêm"}</Button>
                {isEditing && <Button variant="secondary" className="btn-fill mt-3 ml-2" onClick={resetForm}>Hủy</Button>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* BẢNG DANH SÁCH */}
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <Card.Title as="h4">Kho Hàng</Card.Title>
                    <Form.Control 
                        as="select" 
                        style={{width: "200px"}} 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="ALL">Tất cả danh mục</option>
                        <option value="Áo">Áo</option>
                        <option value="Quần">Quần</option>
                        <option value="Giày">Giày</option>
                        <option value="Phụ kiện">Phụ kiện</option>
                        <option value="Khác">Khác</option>
                    </Form.Control>
                </div>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Kho</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <img 
                            src={item.image} 
                            alt="sp" 
                            style={{
                                width: "50px", height: "50px", objectFit: "cover", 
                                borderRadius: "5px", border: "1px solid #ddd"
                            }} 
                            onError={(e) => e.target.src = "https://via.placeholder.com/50"}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                          <span className="badge badge-info" style={{padding: "5px 10px", fontSize: "12px"}}>
                              {item.category || "Chưa phân loại"}
                          </span>
                      </td>
                      <td>${item.price}</td>
                      <td>{item.stock}</td>
                      <td>
                        <Button size="sm" variant="warning" onClick={() => handleEditClick(item)} className="mr-1"><i className="fa fa-edit"></i></Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}><i className="fa fa-trash"></i></Button>
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