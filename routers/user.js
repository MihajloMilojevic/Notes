const express = require("express");
const {register, login, deleteUser, logout} = require("../controllers/users");
const auth = require("../middleware/authentication");

const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/delete").delete(auth, deleteUser)

module.exports = router;