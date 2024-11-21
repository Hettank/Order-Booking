import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Upload, message } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const API = import.meta.env.VITE_API_URL;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      const response = await axios.post(`${API}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      form.resetFields();
      setFileList([]);

      if (response.status === 201) {
        message.success("Product Created Successfully");
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
          Create Product
        </Title>

        <Form
          name="create_product"
          initialValues={{ remember: true }}
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

          {/* Image Upload Field */}
          <Form.Item
            name="images"
            label="Upload Images"
            valuePropName="fileList"
            getValueFromEvent={handleChange}
            extra="Select one or multiple images"
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
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
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProduct;
