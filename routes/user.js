const express = require("express");
const router = express.Router();
//const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const flash = require("connect-flash");
const { saveRedirectUrl } = require("../middleware.js");
const users = require("../controllers/users.js");


router.route("/signup")
.get((req, res) => {
  res.render("users/signup.ejs");
})
.post(wrapAsync(users.signup));

router.route("/login")
.get( (req, res) => {
  res.render("users/login.ejs");
})
.post(saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapAsync(users.login));

router.get("/logout",users.logout);

module.exports = router;
