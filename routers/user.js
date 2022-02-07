const express = require("express");
const {register, login, deleteUser, logout, showMe} = require("../controllers/users");
const auth = require("../middleware/authentication");

const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/showme").get(auth, showMe);
router.route("/delete").delete(auth, deleteUser)

module.exports = router;