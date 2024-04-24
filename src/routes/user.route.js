const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/user.controller");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/auth/login", loginUser);

router.post("/auth/register", registerUser);

router.get("/auth/me", validateToken, currentUser);

module.exports = router;
