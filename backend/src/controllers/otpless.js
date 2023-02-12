const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

const secret = "otpless-test-secret-key";

exports.login = async (req, res, next) => {
  const payload = {
    waId: req.body.waId,
  };
  const headers = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    "Content-Type": "application/json",
  };

  await axios
    .post("https://example.authlink.me", payload, { headers: headers })
    .then((response) => {
      var token = jwt.sign({ id: response.data.user.waNumber }, secret, {
        expiresIn: 86400 * 365,
      });
      const responseData = {
        success: true,
        ok: true,
        status: "SUCCESS",
        code: 200,
        accessToken: token,
        user: response.data.user,
      };
      res.status(200).json(responseData);
    })
    .catch((err) => res.status(400).json({ data: err }));
};
