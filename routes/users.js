var express = require("express");
var router = express.Router();

var {
  httpGetAllUsers,
  httpFollowUser,
  httpGetFollowers,
  httpGetFollowing,
  httpGetUserById,
  httpUnFollowUser,
} = require("../controllers/usersController");

/* GET users listing. */
/**
User Management Api's Endpoints

/api/users (GET): Get a list of all users.
/api/users/:id (GET): Get user details by ID.
/api/users/:id/follow (POST): Follow a user.
/api/users/:id/unfollow (POST): Unfollow a user.
/api/users/:id/followers (GET): Get followers for a user.
/api/users/:id/following (GET): Get users a person is following.

**/
router.get("/", httpGetAllUsers);
router.get("/:id", httpGetUserById);
router.post("/:id/follow", httpFollowUser);
router.post("/:id/unfollow", httpUnFollowUser);
router.get("/:id/followers", httpGetFollowers);
router.get("/:id/following", httpGetFollowing);

module.exports = router;
