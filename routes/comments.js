const express = require('express');
const router = express.Router();
const comment = require('../controller/commentsControl');

router.get('',  (req, res, next) => {
    comment.getAllComments(req, res);
});

router.post('/',  (req, res, next) => {
    comment.createNewComment(req, res);
});

router.get('/:id',  (req, res, next) => {
    comment.getCommentById(req, res);
});

router.get('/blogs/:id',  (req, res, next) => {
    comment.getCommentByBlogId(req, res);
});

router.patch('/:id',  (req, res, next) => {
    comment.updateComment(req, res);
});

router.delete('/:id', (req, res, next) => {
    comment.deleteComment(req, res)
});


module.exports = router;
