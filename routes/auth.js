var express = require("express");
var passport = require("passport");
var {
  httpRegisterUser,
  httpLogoutUser,
  httpLoginFailure,
  httpLoginSuccess,
} = require("../controllers/authController");

var router = express.Router();

/* GET home page. */
/**
Authentication:

/api/auth/register (POST): User registration.
/api/auth/login (POST): User login.
/api/auth/logout (POST): User logout.

**/
router.post("/register", httpRegisterUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login-failure",
    successRedirect: "login-success",
  })
);
router.get("/logout", httpLogoutUser);
router.get("/login-failure", httpLoginFailure);
router.get("/login-success", httpLoginSuccess);

module.exports = router;
