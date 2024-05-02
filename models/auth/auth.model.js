const User = require("../users/users.mongoose");
const { genPassword } = require("../../utils/utils");

async function registerUser(user) {
  const { username, email, password, bio, profileImage } = user;
  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new Error(
          "Username already exists. Please choose a different username."
        );
      } else {
        throw new Error("Email already exists. Please use a different email.");
      }
    }

    // Hash the password
    const { salt, hash } = genPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      email,
      hash,
      salt,
      bio,
      profileImage,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    return { success: true, message: "User registration successful." };
  } catch (error) {
    // Respond with error message
    return { success: false, message: error.message };
  }
}

module.exports = {
  registerUser,
};
