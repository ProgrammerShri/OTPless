const express = require("express");
const router = express.Router();
const OtpLessController = require("../controllers/otpless");

router.post("/getUserDetails", OtpLessController.login);

module.exports = router;
