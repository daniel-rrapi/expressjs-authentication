const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("Connection to MongoDB failed", error);
    });
};

module.exports = connectDb;
