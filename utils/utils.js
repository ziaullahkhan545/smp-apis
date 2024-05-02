const crypto = require("crypto");

// TODO
function validPassword(password, hash, salt) {
  const hashCheck = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashCheck;
}
function genPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
}

function isAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ success: false, message: "Unauthorized. Please login first." });
  }
}

module.exports = {
  validPassword, genPassword, isAuth
}