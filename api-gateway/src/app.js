const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const proxyRoutes = require("./routes/proxy.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

//health check for gateway
app.get("/health", (req, res) => {
  res.json({ message: "API Gateway running" });
});

app.use("/", proxyRoutes);

module.exports = app;
