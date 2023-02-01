const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const otpless = require("./src/routes/otpless");
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Expose-Headers");
  next();
});

// Set up Global configuration access
dotenv.config();

app.use("/api", otpless);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
