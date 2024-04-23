const mongoose = require("mongoose");
const { use } = require("../routes/user.route");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add the full name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
