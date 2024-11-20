import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

const API = import.meta.env.VITE_API_URL;

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/api/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "From Date",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      key: "toDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Product ID",
      dataIndex: ["Product", "id"],
      key: "product",
    },
    {
      title: "Booked By",
      dataIndex: ["User", "firstName"],
      key: "user",
    },
  ];

  return (
    <div className="booking-container">
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  );
};

export default Bookings;
