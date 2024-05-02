
const { registerUser, loginUser } = require("../models/auth/auth.model");

async function httpRegisterUser(req, res, next) {
  try {
    const user = req.body;
    const result = await registerUser(user);
    if (result.success) {
      return res.status(201).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res.send(error);
  }
}

async function httpLoginUser(req, res, next) {
  const { username, password } = req.body;
  try {
    const result = await loginUser();
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res.send(error);
  }
}

async function httpLoginFailure(req, res, next) {
  try {
    return res.send({ success: false, message: "Login failed, try again" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
}

async function httpLoginSuccess(req, res, next) {
  try {
    return res.send({ success: true, message: "User successfully login" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
}

async function httpLogoutUser(req, res, next) {
  try {
    // Passport adds a logout() method to the request object
    req.logout(() => {
      // Redirect or respond after successful logout
      return res
        .status(200)
        .json({ success: true, message: "Logout successful" });
    });
  } catch (error) {
    // Handle errors during logout
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
  httpLogoutUser,
  httpLoginFailure,
  httpLoginSuccess,
};
