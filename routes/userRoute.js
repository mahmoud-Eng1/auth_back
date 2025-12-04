const express = require("express");
const jwtToken = require("../middleware/authUser");
const { getUsers, getSingleUser, updateUser, deleteUser } = require("../controllars/servesUser");
const router = express.Router();

router.use(jwtToken)
router.get("/",getUsers)
router.get("/:id",getSingleUser)
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);



module.exports = router;