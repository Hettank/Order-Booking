import { EditOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import moment from "moment";

const API = import.meta.env.VITE_API_URL;

const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [myBookings, setMyBookings] = useState([]);

  const fetchProdByUser = async () => {
    try {
      const response = await axios.get(
        `${API}/api/bookings/my-bookings/${user.id}`
      );

      if (response.status === 200) {
        setMyBookings(
          Array.isArray(response.data) ? response.data : [response.data]
        );
      }
    } catch (error) {
      console.log("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchProdByUser();
  }, []);

  const columns = [
    {
      title: "From Date",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      key: "toDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span className={isActive ? "active" : "inactive"}>
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Product",
      dataIndex: "Product",
      render: (product) => (product ? product.name : "N/A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
          <NavLink to={`/update-booking`} state={record}>
            <Button type="link" icon={<EditOutlined />} />
          </NavLink>
        </div>
      ),
    },
  ];

  console.log(myBookings);

  return (
    <div className="booking-container">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <NavLink to="/book-product">
          <Button type="primary">Book Now</Button>
        </NavLink>
        <Table
          columns={columns}
          dataSource={myBookings}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </Space>
    </div>
  );
};

export default MyBookings;
