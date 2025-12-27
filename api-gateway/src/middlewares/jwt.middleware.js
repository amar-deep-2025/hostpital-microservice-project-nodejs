const jwt = require("jsonwebtoken");

const PUBLIC_PATHS = ["/health", "/auth/login", "/auth/register"];

module.exports = (req, res, next) => {
  if (PUBLIC_PATHS.includes(req.path)) {
    next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user - decoded; // (userId, role)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or Expired token" });
  }
};
