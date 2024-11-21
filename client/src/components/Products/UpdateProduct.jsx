import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Typography, Upload, message } from "antd";
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

  console.log(productData);

  useEffect(() => {
    if (productData && productData.images) {
      const initialFileList = productData.images.map((image, index) => ({
        uid: `${index}`,
        name: `image-${index + 1}`,
        status: "done",
        url: image,
      }));

      setFileList(initialFileList);
    }
  }, [productData]);

  const onFinish = async (values) => {
    const formData = new FormData();

    fileList.forEach((file) => {
      if (!file.url) {
        formData.append("images", file.originFileObj);
      }
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
        message.success("Product Updated Successfully");
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
            images: fileList,
          }}
          style={{ marginTop: "1rem" }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter the price" },
              {
                type: "number",
                message: "Price must be a number",
                transform: Number,
              },
            ]}
          >
            <Input placeholder="Enter product price" />
          </Form.Item>

          <Form.Item
            name="images"
            label="Upload Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            extra="Select one or multiple images"
          >
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              multiple
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            >
              <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateProduct;
