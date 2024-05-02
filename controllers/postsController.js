const {
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
} = require("../models/posts/posts.model");

async function httpGetAllPosts(req, res, next) {
  try {
    const userID = req.user._id.toString();
    const result = await getAllPosts();
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

async function httpGetPostById(req, res, next) {
  try {
    const postID = req.params.id;
    console.log("postID, :", postID);
    const result = await getPostById(postID);
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

async function httpCreateNewPost(req, res, next) {
  try {
    const userID = req.user._id.toString();
    const { content } = req.body;
    const result = await createNewPost(userID, content);
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

async function httpUpdatePost(req, res, next) {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    console.log("postID: :", postId, "content: :", content);
    const result = await updatePost(postId, content);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: "internal error" });
  }
}

async function httpDeletePost(req, res, next) {
  try {
    const postId = req.params.id;
    const result = await deletePost(postId);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: "Internal error" });
  }
}

async function httpGetCommentsOnPost(req, res, next) {
  try {
    const postId = req.params.id;
    const result = await getCommentsOnPost(postId);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: "Internal error" });
  }
}

const httpAddCommentToPost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id.toString();
  const { content } = req.body;
  try {
    const result = await addCommentToPost(postId, userId, content);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update comment on a post
const httpUpdateCommentOnPost = async (req, res) => {
  const { postId, commentId } = req.params;
  const { content } = req.body;
  try {
    const result = await updateCommentOnPost(commentId, postId, content);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    res.status(500).json({ success: false,  message: error.message });
  }
};

// Delete comment on a post
const httpDeleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const result = await deleteCommentOnPost(postId, commentId);
    if(result.success) {
      return res.status(200).send(result); 
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like post
const httpLikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  try {
    const result = await likePost(postId, userId);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dislike post
const httpDislikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const result = await dislikePost(postId, userId);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result)
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  httpGetAllPosts,
  httpGetPostById,
  httpCreateNewPost,
  httpUpdatePost,
  httpDeletePost,
  httpGetCommentsOnPost,
  httpAddCommentToPost,
  httpUpdateCommentOnPost,
  httpDeleteComment,
  httpLikePost,
  httpDislikePost,
};
