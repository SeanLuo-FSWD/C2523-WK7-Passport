const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const { active_list, add_user, remove_user } = require("../data/active_users");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log("active user list /dashboard");
  console.log(active_list);
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
  const objectArray = Object.entries(req.sessionStore.sessions);
  let users = [];

  objectArray.forEach(([key, value]) => {
    const user_id = parseInt(JSON.parse(value).passport.user);
    if (active_list.includes(user_id)) {
      users.push([key, user_id]);
    }
  });

  res.render("admin", {
    user: req.user,
    users: users,
  });

  // if (req.user.role === "admin") {
  //   res.render("admin", {
  //     user: req.user,
  //     users: users,
  //   });
  // } else {
  //   res.render("dashboard", {
  //     user: req.user,
  //   });
  // }
});

module.exports = router;
