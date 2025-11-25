import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";


import Orders from "views/Orders.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "TỔNG QUAN",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "HỒ SƠ CÁ NHÂN",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "QUẢN LÝ SẢN PHẨM",
    icon: "nc-icon nc-app",
    component: TableList,
    layout: "/admin",
  },
  // Chắc chắn đoạn này bạn đã thêm rồi đúng không?
  {
    path: "/orders",
    name: "ĐƠN HÀNG",
    icon: "nc-icon nc-delivery-fast",
    component: Orders, 
    layout: "/admin",
  },
];

export default dashboardRoutes;