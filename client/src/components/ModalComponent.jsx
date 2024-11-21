import { DatePicker, Form, Space, Modal } from "antd";
import React from "react";

const ModalComponent = ({ title, onClose, isOpen, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      okText="Book Now"
      onOk={() => form.submit()}
    >
      <div style={{ width: "100%" }}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Space direction="vertical" size="medium" style={{ width: "100%" }}>
            <Form.Item
              label="From Date"
              name="fromDate"
              rules={[
                { required: true, message: "Please select a start date" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} name="fromDate" />
            </Form.Item>
            <Form.Item
              label="To Date"
              name="toDate"
              rules={[{ required: true, message: "Please select an end date" }]}
            >
              <DatePicker style={{ width: "100%" }} name="toDate" />
            </Form.Item>
          </Space>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalComponent;
