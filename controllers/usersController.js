const {
  getAllUsers,
  getUserById,
  followUser,
  unFollowUser,
  getFollowers,
  getFollowing,
} = require("../models/users/users.model");

async function httpGetAllUsers(req, res, next) {
  try {
    const result = await getAllUsers();
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res.send(error);
  }
}

async function httpGetUserById(req, res, next) {
  try {
    const userID = req.params.id;
    const result = await getUserById(userID);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function httpFollowUser(req, res, next) {
  try {
    const userID = req.params.id;
    const followerID = req.user._id.toString();
    const result = await followUser(userID, followerID);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error Occured" });
  }
}

async function httpUnFollowUser(req, res, next) {
  try {
    const userID = req.params.id;
    const followerID = req.user._id.toString();
    const result = await unFollowUser(userID, followerID);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error Occured" });
  }
}

async function httpGetFollowers(req, res, next) {
  try {
    const userID = req.params.id;
    const result = await getFollowers(userID);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
}

async function httpGetFollowing(req, res, next) {
  try {
    const userID = req.params.id;
    const result = await getFollowing(userID);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
}

module.exports = {
  httpGetAllUsers,
  httpGetUserById,
  httpFollowUser,
  httpUnFollowUser,
  httpGetFollowers,
  httpGetFollowing,
};
