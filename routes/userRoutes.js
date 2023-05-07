const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
  getUsers,
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

// router.get("/", getUsers);
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/current", validateToken, currentUser);
//............other way around................................................................
router.route("/").get(getUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// Note: if you want to validate only specific route the use below this.
router.route("/current").get(validateToken, currentUser);

module.exports = router;
