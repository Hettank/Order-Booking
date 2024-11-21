import React, { useState } from "react";
import { Menu, Button, Layout } from "antd";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeFilled,
  CodeSandboxOutlined,
  SettingFilled,
  ProductOutlined,
  ProductFilled,
  BookOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const user = JSON.parse(localStorage.getItem("user"));

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    "/": "Home",
    "/products": "Products",
    "/bookings": "Bookings",
    "/my-bookings": "My Bookings",
    "/book-product": "Book Product",
    "/update-booking": "Update Booking",
    "/login": "Login",
    "/register": "Register",
    "/products/create-product": "Create Product",
    "/products/product-details": "Product Details",
  };

  const pageTitle = pageTitles[location.pathname] || "";

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={230}
      >
        <div
          style={{
            height: "64px",
            margin: "16px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h2>Logo</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          inlineIndent={18}
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          items={[
            // {
            //   key: 1,
            //   icon: <HomeFilled />,
            //   label: <NavLink to="/">Home</NavLink>,
            // },
            ...(user.role === "admin"
              ? [
                  {
                    key: 2,
                    icon: <ProductFilled />,
                    label: <NavLink to="/products">Products</NavLink>,
                  },
                ]
              : []),
            {
              key: 3,
              icon: <BookOutlined />,
              label:
                user.role === "admin" ? (
                  <NavLink to="/bookings">Bookings</NavLink>
                ) : (
                  <NavLink to="/my-bookings">My Bookings</NavLink>
                ),
            },
          ]}
        />
      </Sider>
      <Layout
        style={{ marginLeft: collapsed ? 80 : 230, transition: "all 0.2s" }}
      >
        <Header
          style={{
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#001529",
            color: "white",
            justifyContent: "space-between",
          }}
        >
          <div className="btn-title-container">
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined size={25} />
                ) : (
                  <MenuFoldOutlined size={25} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", color: "white" }}
            />
            <h2 style={{ color: "white", margin: 0 }}>{pageTitle}</h2>
          </div>

          <div className="profile-container">
            {user.role === "admin" ? (
              <h4>Hi, Admin</h4>
            ) : (
              <h4>Hi, {user.firstName}</h4>
            )}

            {user ? (
              <Button
                type="primary"
                style={{ borderRadius: "8px" }}
                onClick={logout}
                color="danger"
                variant="solid"
              >
                Logout
              </Button>
            ) : (
              <NavLink to="/login">
                <Button type="primary" style={{ borderRadius: "8px" }}>
                  Login
                </Button>
              </NavLink>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "1rem",
            overflow: "initial",
            padding: "1rem",
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
