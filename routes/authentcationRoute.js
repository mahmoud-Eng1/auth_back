const express = require("express");
const {
  register,
  login,
  refresh,
  logout,
} = require("../controllars/authentcationUses");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/refresh", refresh)
router.get("/logout", logout)


module.exports = router;
