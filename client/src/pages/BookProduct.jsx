import {
  DatePicker,
  Form,
  Space,
  Select,
  Button,
  message,
  Flex,
  Col,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const BookProduct = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [productOptions, setProductOptions] = useState([]);

  const [form] = Form.useForm();

  const fetchAvailableProducts = async (fromDate, toDate) => {
    try {
      const params = {};

      if (fromDate && toDate) {
        params.fromDate = fromDate.format("YYYY-MM-DD");
        params.toDate = toDate.format("YYYY-MM-DD");
      }

      const response = await axios.get(
        `${API}/api/products/available-products`,
        {
          params,
        }
      );

      const formattedProducts = response.data.map((prod) => ({
        value: prod.id,
        label: prod.name,
      }));

      setProductOptions(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to fetch products. Please try again.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/api/products`);

      const formattedProducts = response.data.map((prod) => ({
        value: prod.id,
        label: prod.name,
      }));

      setProductOptions(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to fetch products. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDateChange = () => {
    const fromDate = form.getFieldValue("fromDate");
    const toDate = form.getFieldValue("toDate");

    if (fromDate && toDate) {
      fetchAvailableProducts(fromDate, toDate);
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${API}/api/products/book-product/${user.id}`,
        values
      );

      if (response.status === 200) {
        message.success("Booking Successful");
        navigate("/my-bookings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ maxWidth: "500px", padding: "1rem" }}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Space direction="vertical" size="medium" style={{ width: "100%" }}>
            <Flex gap={10}>
              <Col flex={1}>
                <Form.Item
                  label="From Date"
                  name="fromDate"
                  rules={[
                    { required: true, message: "Please select a start date" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item
                  label="To Date"
                  name="toDate"
                  rules={[
                    { required: true, message: "Please select an end date" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              </Col>
            </Flex>

            <Form.Item
              label="Select Product"
              name="productName"
              rules={[{ required: true, message: "Please select a product" }]}
            >
              <Select options={productOptions} />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Book Now
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default BookProduct;
