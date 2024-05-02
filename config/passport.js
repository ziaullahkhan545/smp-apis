const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const connection = require("./database");
const User = require("../models/users/users.mongoose");
const { validPassword } = require("../utils/utils");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((error) => {
      return done(error);
    });
};

const Strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(Strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userID, done) => {
  User.findById(userID)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});
