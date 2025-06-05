const express = require("express");
const router = express.Router();
const { loginAdmin, getSession } = require("../controllers/sessionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", loginAdmin);
router.get("/me", authMiddleware, getSession);

module.exports = router;

