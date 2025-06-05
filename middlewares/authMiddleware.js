const { verifyToken } = require("../utils/tokenManager");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
  if (!payload) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.user = payload;
  next();
};
