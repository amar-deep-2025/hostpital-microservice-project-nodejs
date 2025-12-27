const express = require("express");
const router = express.Router();

const { createProxyMiddleware } = require("http-proxy-middleware");

router.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

router.use(
  "/patients",
  createProxyMiddleware({
    target: process.env.PATIENT_SERVICE_URL,
    changeOrigin: true,
  })
);

router.get(
  "/doctors",
  createProxyMiddleware({
    target: process.env.DOCTOR_SERVICE_URL,
    changeOrigin: true,
  })
);

module.exports = router;
