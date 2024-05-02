const User = require("./users.mongoose");

const getAllUsers = async () => {
  try {
    const users = await User.find(
      {},
      { hash: 0, salt: 0, following: 0, followers: 0 }
    );
    if (users.length) {
      // Respond with success message and with data
      return { success: true, message: "Users found", data: users };
    } else {
      // Respond with successs message but without data
      return { success: true, message: "Users not found", data: null };
    }
  } catch (error) {
    // Respond with error message
    return { success: false, message: error.message };
  }
};

const getUserById = async (userID) => {
  try {
    const user = await User.findOne(
      { _id: userID },
      { hash: 0, salt: 0, following: 0, followers: 0 }
    );
    if (user) {
      // Respond with success message and with data
      return { success: true, message: "Users found", data: user };
    } else {
      // Respond with successs message but without data
      return { success: false, message: "Users not found", data: null };
    }
  } catch (error) {
    // Respond with error message
    return { success: false, message: error.message };
  }
};

const followUser = async (userID, followerID) => {
  try {
    if (userID === followerID) {
      return { success: false, message: "Cannot follow yourself" };
    }

    // Update the user being followed (add the follower)
    const userBeingFollowed = await User.findByIdAndUpdate(
      userID,
      { $addToSet: { followers: followerID } }, // $addToSet ensures no duplicate entries
      { new: true }
    );

    if (!userBeingFollowed) {
      return { success: false, message: "User not found" };
    }

    // Update the follower (add the user being followed)
    const follower = await User.findByIdAndUpdate(
      followerID,
      { $addToSet: { following: userID } },
      { new: true }
    );

    if (!follower) {
      // Rollback the change in case of an error
      await User.findByIdAndUpdate(userID, {
        $pull: { followers: followerID },
      });
      return { success: false, message: "Follower not found" };
    }

    return {
      success: true,
      message: "User followed successfully",
      data: userBeingFollowed,
    };
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
};

const unFollowUser = async (userID, followerID) => {
  try {
    // Check if the user is trying to unfollow themselves
    if (userID === followerID) {
      return { success: false, message: "Cannot unfollow yourself" };
    }

    // Update the user being unfollowed (remove the follower)
    const userBeingUnfollowed = await User.findByIdAndUpdate(
      userID,
      { $pull: { followers: followerID } },
      { new: true }
    );

    if (!userBeingUnfollowed) {
      return { success: false, message: "User not found" };
    }

    // Update the follower (remove the user being unfollowed)
    const unfollower = await User.findByIdAndUpdate(
      followerID,
      { $pull: { following: userID } },
      { new: true }
    );

    if (!unfollower) {
      // Rollback the change in case of an error
      await User.findByIdAndUpdate(userID, {
        $addToSet: { followers: followerID },
      });
      return { success: false, message: "Unfollower not found" };
    }

    return {
      success: true,
      message: "User unfollowed successfully",
      data: userBeingUnfollowed,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
};

const getFollowers = async (userID) => {
  try {
    // Find the user by ID and populate the followers field to get the details of each follower
    const user = await User.findById(userID).populate(
      "followers",
      "_id email username bio profileImage"
    );

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const followers = user.followers.map((follower) => ({
      _id: follower._id,
      email: follower.email,
      username: follower.username,
      profileImage: follower.profileImage,
      bio: follower.bio,
    }));

    return { success: true, message: "Followers found", data: followers };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
};

const getFollowing = async (userID) => {
  try {
    // Find the user by ID and populate the followers field to get the details of each follower
    const user = await User.findById(userID).populate(
      "following",
      "_id email username bio profileImage"
    );

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const following = user.following.map((followingUser) => ({
      _id: followingUser._id,
      email: followingUser.email,
      username: followingUser.username,
      profileImage: followingUser.profileImage,
      bio: followingUser.bio,
    }));

    if (following.length > 0) {
      return { success: true, message: "Following found", data: following };
    } else {
      return { success: false, message: "No one is following this user" };
    }
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  followUser,
  unFollowUser,
  getFollowers,
  getFollowing,
};
