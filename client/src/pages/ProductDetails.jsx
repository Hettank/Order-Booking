import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Col, Row, Typography, Image, Button, Tag } from "antd";
import { DollarCircleOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const API = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const location = useLocation();
  const productData = location.state || {};

  if (!productData.id) {
    return <div>Product not found.</div>;
  }

  console.log(productData);

  const { name, description, price, images, createdAt, updatedAt } =
    productData;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1}>{name}</Title>

      <Row gutter={32}>
        <Col xs={24} md={12}>
          <Card bordered={false} style={{ background: "#f7f7f7" }}>
            <Title level={3}>Product Images</Title>
            <Row gutter={16}>
              {images.map((img, index) => (
                <Col key={index} span={12}>
                  <Image
                    width="100%"
                    src={img}
                    alt={`product-image-${index + 1}`}
                    preview={false}
                  />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card bordered={false} style={{ background: "#f7f7f7" }}>
            <Title level={3}>Product Details</Title>
            <Text strong>Description:</Text>
            <p>{description}</p>

            <Row gutter={16}>
              <Col span={12}>
                <Text strong>
                  <DollarCircleOutlined /> Price:
                </Text>
                <Text style={{ fontSize: "18px", color: "#1890ff" }}>
                  ${price}
                </Text>
              </Col>
              <Col span={12}>
                <Text strong>
                  <CalendarOutlined /> Created At:
                </Text>
                <Text>{new Date(createdAt).toLocaleDateString()}</Text>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Text strong>
                  <CalendarOutlined /> Updated At:
                </Text>
                <Text>{new Date(updatedAt).toLocaleDateString()}</Text>
              </Col>
            </Row>

            <div style={{ marginBlock: "20px" }}>
              <Tag color="blue">Available</Tag>
            </div>

            <div>
              <Button type="primary">Book Product</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
