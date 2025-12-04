const User = require("../models/users");
const bcrypt = require("bcrypt");
const AppErrors = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppErrors("user not found", 400));
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return next(new AppErrors("Invalid credentials", 400));
  const accessToken = jwt.sign(
    {
      userInfo: {
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m"}
  );
  const refreshToken = jwt.sign(
    {
      userInfo: {
        id: user._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
};

const register = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password)
    return next(new AppErrors("All faild is required", 400));
  const existUser = await User.findOne({ email }).exec();
  if (existUser) return next(new AppErrors("User already exists", 400));
  const hashPassword = await bcrypt.hash(password, 10);
  const createUser = await User.create({
    first_name,
    last_name,
    email,
    password: hashPassword,
  });
  const accessToken = jwt.sign(
    {
      userInfo: {
        id: createUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      userInfo: {
        id: createUser._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    first_name: createUser.first_name,
    last_name: createUser.last_name,
    email: createUser.email,
  });
};
const refresh = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return next(new AppErrors("Unauthorized", 401));
  const cookiesToke = cookies.jwt;
  jwt.verify(
    cookiesToke,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return next(new AppErrors("forbidden", 403));
      const fouindUser = await User.findById(decoded.userInfo.id).exec();
      if (!fouindUser) return next(new AppErrors("unauthorized", 401));
      const accessToken = jwt.sign(
        {
          userInfo: {
            id: fouindUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      return res.json({ accessToken });
    }
  );
};

const logout = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  login,
  register,
  refresh,
  logout,
};
