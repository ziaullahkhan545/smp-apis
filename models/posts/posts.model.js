const Post = require("./posts.mongoose");
const Comment = require("../comments/comments.mongoose");

const getAllPosts = async () => {
  try {
    const posts = await Post.find({})
      .populate("userId", "username") // Populate user details (e.g., username) for each post
      .populate("comments", "text") // Populate comment details (e.g., text) for each post
      .exec();

    if (posts.length) {
      // Respond with success message and with data
      return { success: true, message: "Posts found", data: posts };
    } else {
      // Respond with success message but without data
      return { success: true, message: "Posts not found", data: null };
    }
  } catch (error) {
    // Respond with error message
    return {
      success: false,
      message: "Internal server error",
      error: error.message,
    };
  }
};

const getPostById = async (postID) => {
  try {
    const post = await Post.findById({ _id: postID });
    if (post) {
      return { success: true, message: "Post found", data: post };
    } else {
      return { success: false, message: "Post not found", data: null };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

async function createNewPost(userId, content, media) {
  try {
    // Validate required fields
    if (!userId || !content) {
      return {
        success: false,
        message: "userId and content are required fields",
      };
    }

    // Create a new post
    const newPost = new Post({
      userId,
      content,
      media,
    });

    // Save the new post to the database
    const savedPost = await newPost.save();

    // Respond with success message and the created post
    return {
      success: true,
      message: "Post created successfully",
      data: savedPost,
    };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
}

const updatePost = async (postId, content) => {
  try {
    // Validate required fields
    if (!content) {
      return {
        success: false,
        message: "Content is a required field for updating a post",
      };
    }

    // Find the post by postId
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    console.log(post);

    // Update the post
    post.content = content;

    // Update the updatedAt timestamp
    post.updatedAt = new Date();

    // Save the updated post to the database
    const updatedPost = await post.save();

    // Respond with success message and the updated post
    return {
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    };
  } catch (error) {
    return { success: false, message: "internal server error" };
  }
};

const deletePost = async (postId) => {
  try {
    // Find the post by postId
    const post = await Post.findByIdAndDelete({ _id: postId });

    // Check if the post exists
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    // Respond with success message
    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

const getCommentsOnPost = async (postId) => {
  try {
    // Find the post by postId and populate the comments field
    const post = await Post.findById(postId).populate("comments");

    // Check if the post exists
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    // Check if there are no comments on the post
    if (post.comments.length === 0) {
      return {
        success: true,
        message: "No comments found for this post",
        data: [],
      };
    }

    // Respond with success message and the comments on the post
    return {
      success: true,
      message: "Comments retrieved successfully",
      data: post.comments,
    };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

const addCommentToPost = async (postId, userId, content) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return { success: false, message: "Post not found" };
    }
    const newComment = await Comment.create({ userId, postId, content });
    post.comments.push(newComment._id);
    await post.save();
    return {
      success: true,
      message: "Comment added successfully",
      data: newComment,
    };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

const updateCommentOnPost = async (commentId, postId, content) => {
  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    // Check if the comment exists and belongs to the specified post
    const comment = await Comment.findOne({ _id: commentId, postId: postId });
    if (!comment) {
      return { success: false, message: "Comment not found" };
    }

    // Update the comment content
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content, updatedAt: Date.now() },
      { new: true }
    );

    return {
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const deleteCommentOnPost = async (postId, commentId) => {
  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    // Check if the comment exists and belongs to the specified post
    const comment = await Comment.findOne({ _id: commentId, postId: postId });
    if (!comment) {
      return { success: false, message: "Comment not found" };
    }

    // delete comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return { success: false, message: "Comment not found" };
    }

    return {
      success: true,
      message: "comment deleted successfully",
      data: deletedComment,
    };
  } catch (error) {
    return { success: false, message: "internal server error" };
  }
};

const likePost = async (postId, userId) => {
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { dislikes: userId },
        $addToSet: { likes: userId },
      },
      { new: true }
    );

    // Check if the post exists or not
    if (!post) {
      return { success: false, message: "Post not found" };
    }
    return { success: true, message: "post liked successfully", data: post };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const dislikePost = async (postId, userId) => {
  try {
    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: userId },
        $addToSet: { dislikes: userId }, // Using $addToSet to avoid duplicate entries
      },
      { new: true }
    );

    if (!result) {
      return { success: false, message: "Post not found" };
    }

    return {
      success: true,
      message: "Post disliked successfully",
      data: result,
    };
  } catch (error) {
    return { success: false, message: "internal server error" };
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createNewPost,
  updatePost,
  deletePost,
  getCommentsOnPost,
  addCommentToPost,
  updateCommentOnPost,
  deleteCommentOnPost,
  likePost,
  dislikePost,
};
