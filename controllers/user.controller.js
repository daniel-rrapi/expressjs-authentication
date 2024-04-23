const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ message: "User already registered" });
    throw new Error("User already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });
  console.log(user.password);
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.fullName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "User info" });
});

module.exports = { registerUser, loginUser, currentUser };
