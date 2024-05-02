const {
    likeComment, 
    dislikeComment,
} = require('../models/comments/comments.model');

// Like post
const httpLikeComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user._id;
  try {
    const result = await likeComment(commentId, userId);
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
const httpDislikeComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user._id;

  try {
    const result = await dislikeComment(commentId, userId);
    if (result.success) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  httpLikeComment,
  httpDislikeComment,
};
