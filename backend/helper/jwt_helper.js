const JWT = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();
const User = require("../models/user.model");

module.exports = {
  genAccessToken: async (userID) => {
    return new Promise((resolve, reject) => {
      const payload = {
        aud: userID,
      };
      const secret = process.env.ACCESS_TOKEN;
      const option = {
        expiresIn: "3h",
        issuer: "Prathmesh Kulkarni",
      };
      JWT.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyAccessToken: async (req, res, next) => {
    try {
      if (!req.headers["authorization"]) throw createError.BadRequest();

      const bodyToken = req.headers["authorization"];
      const splitToken = bodyToken.split(" ");
      console.log("token = ", splitToken);
      const token = splitToken[1];
      JWT.verify(token, process.env.ACCESS_TOKEN, async (err, payload) => {
        if (err) {
          console.log("err = ", err);
          const message =
            err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
          throw createError.Unauthorized(message);
        }
        const user = await User.findById(payload.aud);
        req.payload = user;
        next();
      });
    } catch (error) {
      next(error);
    }
  },
};
