import React, { useState, useEffect } from "react";
import { Pagination, Table } from "antd";
import axios from "axios";
import moment from "moment";

const API = import.meta.env.VITE_API_URL;

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchData = async (page = 1, limit = 5) => {
    try {
      const response = await axios.get(`${API}/api/bookings`, {
        params: {
          page,
          limit,
        },
      });
      setBookings(response.data.rows);
      setTotalUsers(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

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
      title: "Product Name",
      dataIndex: "Product",
      key: "product",
      render: (product) => (product ? product.name : "N/A"),
    },
    {
      title: "Booked By",
      dataIndex: "User",
      key: "user",
      render: (user) => (user ? user.firstName : "N/A"),
    },
  ];

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="booking-container">
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey={(record) => record.id}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalUsers}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["5", "10", "20"]}
        showTotal={(total) => `Total ${total} users`}
        style={{
          marginTop: "20px",
        }}
      />
    </div>
  );
};

export default Bookings;
