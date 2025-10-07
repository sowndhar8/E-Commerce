import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import fetchdata from "../config/fetchdata";

function VerifyOtpModal({ visible, onClose, phone, onVerified }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await fetchdata.SendOtp({ mobilenumber: phone });
      if (res.success) message.success("OTP sent successfully!");
    } catch (err) {
      message.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await fetchdata.VerifyOtp({ mobilenumber: phone, otp });
      if (res.success) {
        message.success("Phone verified successfully!");
        onVerified();
        onClose();
      }
    } catch (err) {
      message.error(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} title="Verify Mobile">
      <p>Enter OTP sent to {phone}</p>
      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit OTP"
        maxLength={6}
      />
      <div className="flex justify-between mt-4">
        <Button onClick={handleSendOtp} loading={loading}>Resend OTP</Button>
        <Button type="primary" onClick={handleVerifyOtp} loading={loading}>Verify</Button>
      </div>
    </Modal>
  );
}

export default VerifyOtpModal;
