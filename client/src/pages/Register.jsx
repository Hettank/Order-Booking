import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API}/api/auth/register`, values);

      if (response.status === 201) {
        alert("Registration Successfull");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: 600,
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: "#1890ff" }}>
          Register
        </Title>

        <Form
          name="register"
          initialValues={{ remember: true }}
          style={{ marginTop: "1rem" }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            label="First Name"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="First Name"
              size="large"
              name="firstName"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            label="Last Name"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Last Name"
              size="large"
              name="lastName"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            label="Email"
          >
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              size="large"
              name="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            label="Password"
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
              size="large"
              name="password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: "1.5rem" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <NavLink to="/login">Already have an account? Log in</NavLink>
        </div>
      </Card>
    </div>
  );
};

export default Register;
