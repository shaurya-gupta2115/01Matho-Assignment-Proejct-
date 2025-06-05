const redisClient = require("../config/redisClient");
const { generateToken } = require("../utils/tokenManager");

const loginAdmin = async (req, res) => {
  console.log("Incoming login payload:", req.body);
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const user = { id: "admin123", role: "admin" };
    const token = generateToken(user);
    await redisClient.setEx(`session:${user.id}`, 3600, token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 1000 // 1 hour
    });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
};

const getSession = async (req, res) => {
  const userId = req.user.id;
  const session = await redisClient.get(`session:${userId}`);

  if (!session)
    return res.status(404).json({ message: "Session not found or expired" });

  res.json({ active: true, token: session });
};

module.exports = { loginAdmin, getSession };
