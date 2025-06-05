const { verifyToken } = require("../utils/tokenManager");

module.exports = (req, res, next) => {
  const headerToken = req.headers["x-admin-token"];
  const cookieToken = req.cookies?.token;

  // Case 1: header-based admin token
  if (headerToken && headerToken === process.env.ADMIN_TOKEN) {
    return next();
  }

  // Case 2: JWT token stored in cookies
  if (cookieToken) {
    const payload = verifyToken(cookieToken);
    if (payload && payload.role === "admin") {
      req.user = payload;
      return next();
    }
  }

  return res.status(403).json({ message: "Access denied: Admins only" });
};
