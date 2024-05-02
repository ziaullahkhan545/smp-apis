
const Comment = require('./comments.mongoose');

const likeComment = async (commentId, userId) => {
    try {
      const result = await Comment.findByIdAndUpdate(
        commentId,
        {
          $pull: { dislikes: userId },
          $addToSet: { likes: userId },
        },
        { new: true }
      );
  
      // Check if the post exists or not
      if (!result) {
        return { success: false, message: "Comment not found" };
      }
      return { success: true, message: "Comment liked successfully", data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  const dislikeComment = async (commentId, userId) => {
    try {
      const result = await Comment.findByIdAndUpdate(
        commentId,
        {
          $pull: { likes: userId },
          $addToSet: { dislikes: userId }, // Using $addToSet to avoid duplicate entries
        },
        { new: true }
      );
  
      if (!result) {
        return { success: false, message: "Comment not found" };
      }
  
      return {
        success: true,
        message: "Comment disliked successfully",
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  module.exports = {
    likeComment,
    dislikeComment
  }