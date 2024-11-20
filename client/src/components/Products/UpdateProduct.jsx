import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Upload } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

const API = import.meta.env.VITE_API_URL;

const UpdateProduct = () => {
  const [form] = Form.useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const [fileList, setFileList] = useState([]);

  const productData = location.state;

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      const response = await axios.patch(
        `${API}/api/products/update-product/${productData.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      form.resetFields();
      setFileList([]);

      if (response.status === 200) {
        alert("Product Updated");
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="product-container"
      style={{ alignItems: "center", justifyContent: "center" }}
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
          Update Product
        </Title>

        <Form
          name="create_product"
          initialValues={{
            name: productData?.name,
            description: productData?.description,
            price: productData?.price,
          }}
          style={{ marginTop: "1rem" }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Title is required" }]}
            label="Name"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Product Name"
              size="large"
              name="name"
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: "Description is required!" }]}
            label="Description"
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Product Description"
              size="large"
              name="description"
            />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true, message: "Price is required!" }]}
            label="Price"
          >
            <Input
              prefix={<DollarOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Price"
              size="large"
              name="price"
            />
          </Form.Item>

          <Form.Item
            name="images"
            label="Upload Images"
            valuePropName="fileList"
            extra="Select one or multiple images"
          >
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
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
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateProduct;
