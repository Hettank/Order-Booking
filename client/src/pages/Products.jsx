import { DeleteOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const API = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/api/products`);

      const updatedProducts = response.data.map((product) => ({
        ...product,
        images: product.images.map(
          (image) =>
            `${API}/${image
              .replace(/\\/g, "/")
              .replace("public/", "")
              .replace("uploads/", "uploads//")}`
        ),
      }));

      const productsWithKeys = updatedProducts.map((product) => ({
        ...product,
        key: product.id,
      }));

      setProducts(productsWithKeys);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("products:", products);

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`${API}/api/products/delete-product`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) =>
        user.role === "admin" ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="btn-container">
              <NavLink to={`/products/product-update`} state={record}>
                <Button type="link" icon={<EditOutlined />} />
              </NavLink>
              <Button
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={deleteProduct}
              />
            </div>
            <div className="record-details">
              <NavLink to={`/products/product-details`} state={record}>
                <Button type="link" icon={<RightOutlined />} />
              </NavLink>
            </div>
          </div>
        ) : (
          <div>
            <div className="record-details">
              <NavLink to={`/products/product-details`} state={record}>
                <Button type="link" icon={<RightOutlined />} />
              </NavLink>
            </div>
          </div>
        ),
    },
  ];

  return (
    <div className="product-container">
      <div className="product-title">
        <h2>Products</h2>
        {user.role === "admin" && (
          <NavLink to="/products/create-product">
            <Button type="primary">Add Product</Button>
          </NavLink>
        )}
      </div>
      <Table columns={columns} dataSource={products} pagination={false} />
    </div>
  );
};

export default Products;
