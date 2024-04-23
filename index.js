const express = require("express");
const connectDb = require("./config/dbConnection.js");
const app = express();
require("dotenv").config();

app.use(express.json());
connectDb();

app.use("/", require("./routes/user.route.js"));
// Endpoint di esempio
app.get("/", (req, res) => {
  res.send("Benvenuto nel mio server Express.js con Mongoose!");
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
