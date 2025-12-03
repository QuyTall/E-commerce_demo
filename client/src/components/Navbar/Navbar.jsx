import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/features/auth/authSlice";
import { toast } from "react-toastify";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // Handle scroll fixed header
  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else if (window.scrollY <= 50) {
        setIsFixed(false);
      }
    }

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công!");
    navigate("/login");
    setExpand(false);
  };

  return (
    <Navbar
      fixed="top"
      expand="md"
      className={isFixed ? "navbar fixed" : "navbar"}
      expanded={expand}
    >
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/">
          <ion-icon name="bag"></ion-icon>
          <h1 className="logo">Multimart</h1>
        </Navbar.Brand>

        {/* Media cart + toggle */}
        <div className="d-flex">
          {/* Cart icon for mobile */}
          <div className="media-cart">
            <Link
              aria-label="Go to Cart Page"
              to="/cart"
              className="cart"
              data-num={cartList.length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="nav-icon"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </Link>
          </div>

          {/* Toggle */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpand(expand ? false : "expanded")}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">

            {/* HOME */}
            <Nav.Item>
              <Link
                className="navbar-link"
                to="/"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Home</span>
              </Link>
            </Nav.Item>

            {/* SHOP */}
            <Nav.Item>
              <Link
                className="navbar-link"
                to="/shop"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Shop</span>
              </Link>
            </Nav.Item>

            {/* CART */}
            <Nav.Item>
              <Link
                className="navbar-link"
                to="/cart"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Cart</span>
              </Link>
            </Nav.Item>

            {/* USER LOGIC */}
            {isLoggedIn ? (
              <NavDropdown
                title={
                  <div className="d-flex align-items-center gap-2">

                    {/* Avatar Container */}
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid #fff",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      }}
                    >
                      <img
                        src={
                          user?.avatar ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRsqSqXdjT6z2N1spvBXBw_0e9Q1d75oLttg&s"
                        }
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Username */}
                    <span className="fw-bold text-dark d-none d-lg-block">
                      {user?.username || "Thành viên"}
                    </span>
                  </div>
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Header>
                  Xin chào, <strong>{user?.username}</strong>!
                </NavDropdown.Header>

                <NavDropdown.Item as={Link} to="/profile">
                  Hồ sơ cá nhân
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger fw-bold"
                >
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Item className="d-flex gap-2 ms-3">
                <Link
                  to="/login"
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => setExpand(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-dark btn-sm"
                  onClick={() => setExpand(false)}
                >
                  Register
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
