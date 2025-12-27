const { createProxyMiddleware } = require("http-proxy-middleware");

const router = require("express").Router();

const role = require("../middleware/role.middleware");

//patient
router.get(
  "/patients",
  role("PATIENTS", "DOCTOR"),
  createProxyMiddleware({
    target: process.env.PATIENT_SERVICE_URL,
    changeOrigin: true,
  })
);

//staff
router.get(
  "/staff",
  role("ADMIN", "STAFF"),
  createProxyMiddleware({
    target: process.env.STAFF_SERVICE_URL,
    changeOrigin: true,
  })
);

//admin
router.get(
  "/admin",
  role("ADMIN"),
  createProxyMiddleware({
    target: process.env.ADMIN_SERVICE_URL,
    changeOrigin: true,
  })
);

module.exports = router;
