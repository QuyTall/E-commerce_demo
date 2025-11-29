import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col, Button, Form, Badge } from "react-bootstrap";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const loadUsers = () => {
    axios.get("http://localhost:8080/api/admin/users", getAuthConfig())
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("Lỗi load users:", err));
  };

  useEffect(() => { loadUsers(); }, []);

  // Hàm thay đổi quyền
  const handleChangeRole = async (id, newRole) => {
      if(!window.confirm(`Bạn muốn đổi quyền user này thành ${newRole}?`)) return;
      
      try {
          await axios.put(`http://localhost:8080/api/admin/users/${id}/role`, { role: newRole }, getAuthConfig());
          alert("✅ Cập nhật thành công!");
          loadUsers();
      } catch (err) {
          alert("❌ Lỗi cập nhật!");
      }
  };

  // Hàm xóa user
  const handleDelete = async (id) => {
      if(!window.confirm("Xóa vĩnh viễn user này?")) return;
      try {
          await axios.delete(`http://localhost:8080/api/admin/users/${id}`, getAuthConfig());
          alert("🗑️ Đã xóa!");
          loadUsers();
      } catch (err) {
          alert("❌ Lỗi xóa!");
      }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Quản Lý Người Dùng</Card.Title>
              <p className="card-category">Phân quyền Admin, User và Khách hàng VIP</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Chi tiêu</th>
                    <th>Quyền hạn</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                         {/* Logic gợi ý VIP nếu mua nhiều */}
                         ${user.totalSpent} 
                         {user.totalSpent > 1000 && <span className="badge badge-warning ml-2">Tiềm năng VIP</span>}
                      </td>
                      <td>
                        <Form.Control 
                            as="select" 
                            value={user.role} 
                            onChange={(e) => handleChangeRole(user.id, e.target.value)}
                            style={{
                                border: user.role === 'ADMIN' ? '1px solid red' : user.role === 'VIP' ? '1px solid gold' : '',
                                fontWeight: 'bold',
                                color: user.role === 'ADMIN' ? 'red' : user.role === 'VIP' ? '#d4af37' : 'black'
                            }}
                        >
                            <option value="USER">USER</option>
                            <option value="VIP">VIP 👑</option>
                            <option value="ADMIN">ADMIN 🛡️</option>
                        </Form.Control>
                      </td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Xóa</Button>
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

export default UserList;