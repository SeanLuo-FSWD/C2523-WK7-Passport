const { active_list, add_user, remove_user } = require("../data/active_users");

// ensureAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/auth/login");
// };

ensureAuthenticated = function (req, res, next) {
  if (typeof req.user !== "undefined") {
    if (!active_list.includes(req.user.id)) {
      req.logout();
    } else if (req.isAuthenticated()) {
      return next();
    }
  }
  res.redirect("/auth/login");
};

isAdmin = function (req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  res.redirect("/dashboard");
};

module.exports = {
  ensureAuthenticated,
  isAdmin,
  // If user already logged in, don't show the login page.
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
};
