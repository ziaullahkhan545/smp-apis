const express = require('express');
const { httpLikeComment, httpDislikeComment } = require('../controllers/commentsController');

const router = express.Router();

/**
Comment Management:

/api/comments/:id/like (POST): Like a comment.
/api/comments/:id/dislike (POST): Dislike a comment.
**/


router.post('/:id/like', httpLikeComment);
router.post('/:id/dislike', httpDislikeComment);

module.exports = router;
