"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMyEmailOtp = void 0;
const sendMyEmailOtp = (otp) => {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #3498db;
      color: white;
      padding: 10px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .footer {
      background-color: #f5f5f5;
      text-align: center;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Smart Cashbook Otp</h1>
    </div>
    <div class="content">
      <p>Dear user,</p>
      <p>Your One-Time Password (OTP) is:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 5 minutes. Please use it to complete your verification process.</p>
      <p>If you did not request this OTP, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>If you need assistance, please contact our support team.</p>
    </div>
  </div>
</body>
</html>
`;
};
exports.sendMyEmailOtp = sendMyEmailOtp;
