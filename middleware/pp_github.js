const GithubStrategy = require("passport-github").Strategy;
const GithubLogin = new GithubStrategy(
  {
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, cb) {
    cb(null, profile);
  }
);

module.exports = GithubLogin;
