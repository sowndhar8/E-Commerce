import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps, Card, Row, Col, Button } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CarOutlined, HomeOutlined } from "@ant-design/icons";

const { Step } = Steps;

const TrackOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedOrder = location.state?.order;

  if (!selectedOrder) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-xl text-gray-600 mb-4">No order data found</p>
        <Button type="primary" onClick={() => navigate("/orders")}>
          Back to Orders
        </Button>
      </div>
    );
  }

  // Determine current step index
  const currentStep = selectedOrder.trackingSteps.filter(step => step.completed).length - 1;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Button type="link" onClick={() => navigate("/orders")} className="text-blue-600">
        ← Back to Orders
      </Button>

      <Card title={`Track Order - ID: ${selectedOrder.id}`} className="shadow-md">
        <Steps current={currentStep} size="small" className="!mb-6">
          {selectedOrder.trackingSteps.map((step, index) => (
            <Step
              key={index}
              title={step.label}
              description={step.date ? step.date : "Pending"}
              icon={
                step.completed ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : index === currentStep + 1 ? (
                  <ClockCircleOutlined style={{ color: "#1890ff" }} />
                ) : (
                  <CarOutlined style={{ color: "#d9d9d9" }} />
                )
              }
            />
          ))}
        </Steps>

        <div className="mb-6">
          <Row gutter={16}>
            <Col span={12}>
              <Card className="bg-blue-50 flex items-center gap-3">
                <CheckCircleOutlined style={{ fontSize: 32, color: "#1890ff" }} />
                <div>
                  <p className="text-sm text-gray-600">Order Status</p>
                  <p className="font-bold text-gray-900 capitalize">{selectedOrder.status.replace("_", " ")}</p>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card className="bg-green-50 flex items-center gap-3">
                <HomeOutlined style={{ fontSize: 32, color: "#22c55e" }} />
                <div>
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="font-bold text-gray-900">{selectedOrder.address}</p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
          <Row gutter={[16, 16]}>
            {selectedOrder.products.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  cover={<img src={product.image} alt={product.name} className="h-40 object-cover" />}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                        <p className="font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default TrackOrderPage;
