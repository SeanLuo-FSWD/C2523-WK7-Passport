const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { active_list, add_user, remove_user } = require("../data/active_users");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.post("/revoke", (req, res) => {
  remove_user(req.body.user_id);
  res.redirect("/admin");
});

module.exports = router;
