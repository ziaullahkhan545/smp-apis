const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/postsController");

/**
Post Management:

/api/posts (GET): Get a feed of all posts.
/api/posts/:id (GET): Get post details by ID.
/api/posts (POST): Create a new post.
/api/posts/:id (PUT): Update a post.
/api/posts/:id (DELETE): Delete a post.
/api/posts/:id/comments (GET): Get comments on a specific post.
/api/posts/:id/comments (POST): Add a comment to a post.
/api/posts/:postId/comments/:commentId (PUT): Update a comment.
/api/posts/:postId/comments/:commentId (DELETE): Delete a comment.
/api/posts/:id/like (POST): Like a post.
/api/posts/:id/dislike (POST): Dislike a post.
**/

router.get("/", httpGetAllPosts);
router.get("/:id", httpGetPostById);
router.post("/", httpCreateNewPost);
router.put("/:id", httpUpdatePost);
router.delete("/:id", httpDeletePost);
router.get("/:id/comments", httpGetCommentsOnPost);
router.post("/:id/comments", httpAddCommentToPost);
router.put("/:postId/comments/:commentId", httpUpdateCommentOnPost);
router.delete("/:postId/comments/:commentId", httpDeleteComment);
router.post("/:id/like", httpLikePost);
router.post("/:id/dislike", httpDislikePost);

module.exports = router;