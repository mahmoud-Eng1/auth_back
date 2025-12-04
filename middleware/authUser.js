const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const jwtToken = (req, res, next) => {
  // get access token from headers
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }
  // extract token from header
  const token = authHeader.split(" ")[1];
  // check if headers access token match access token or not
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return next(new AppError("Forbidden", 403));

    req.user = decoded.userInfo.id;
    next();
  });

  
};module.exports = jwtToken
