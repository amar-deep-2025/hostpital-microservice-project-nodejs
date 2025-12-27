const express = require("express");
const router = express.Router();

const { createProxyMiddleware } = require("http-proxy-middleware");
const role = require("../middlewares/role.middleware");

// 🔓 AUTH (PUBLIC)
router.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

// 🧑 PATIENT SERVICE
router.use(
  "/patients",
  role("PATIENT", "DOCTOR", "ADMIN"),
  createProxyMiddleware({
    target: process.env.PATIENT_SERVICE_URL,
    changeOrigin: true,
  })
);

// 👨‍⚕️ DOCTOR SERVICE
router.use(
  "/doctors",
  role("DOCTOR", "ADMIN"),
  createProxyMiddleware({
    target: process.env.DOCTOR_SERVICE_URL,
    changeOrigin: true,
  })
);

// 📅 APPOINTMENTS
router.use(
  "/appointments",
  role("PATIENT", "DOCTOR", "STAFF", "ADMIN"),
  createProxyMiddleware({
    target: process.env.APPOINTMENT_SERVICE_URL,
    changeOrigin: true,
  })
);

// 💳 BILLING
router.use(
  "/billing",
  role("STAFF", "ADMIN"),
  createProxyMiddleware({
    target: process.env.BILLING_SERVICE_URL,
    changeOrigin: true,
  })
);

// 🧾 STAFF
router.use(
  "/staff",
  role("STAFF", "ADMIN"),
  createProxyMiddleware({
    target: process.env.STAFF_SERVICE_URL,
    changeOrigin: true,
  })
);

// 👑 ADMIN
router.use(
  "/admin",
  role("ADMIN"),
  createProxyMiddleware({
    target: process.env.ADMIN_SERVICE_URL,
    changeOrigin: true,
  })
);

module.exports = router;
