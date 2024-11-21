import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Col, Row, Typography, Image, Button, Tag } from "antd";
import { DollarCircleOutlined, CalendarOutlined } from "@ant-design/icons";

import axios from "axios";

const { Title, Text } = Typography;

const API = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookedProd, setBookedProd] = useState({});

  const location = useLocation();
  const productData = location.state || {};

  if (!productData.id) {
    return <div>Product not found.</div>;
  }

  const { id, name, description, price, images } = productData;

  const getBookingsByProd = async () => {
    try {
      const response = await axios.get(
        `${API}/api/bookings/booking-by-prod/${id}`
      );

      setBookedProd(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookingsByProd();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1}>{name}</Title>

      <Row gutter={32}>
        <Col xs={24} md={12}>
          <Card bordered={false} style={{ background: "#f7f7f7" }}>
            <Title level={3}>Product Images</Title>
            <Row gutter={[16, 16]}>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title level={3}>Product Details</Title>
              <p style={{ fontWeight: "600" }}>Prod. ID: {id}</p>
            </div>
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
            </Row>

            {bookedProd.isActive === true ? (
              <Tag color="red" style={{ marginTop: "20px" }}>
                Booked
              </Tag>
            ) : (
              <Tag color="blue" style={{ marginTop: "20px" }}>
                Available
              </Tag>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
