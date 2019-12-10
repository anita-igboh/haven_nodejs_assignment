const Comment = require('../models/comment');

// Comments Controller
const CommentsController = {

    getAllComments: (req, res) => {

        Comment.find({}, {})
            // .populate('blog_id') // Uncomment this and it will append a nested blog_id object with the json object
            .sort({$natural: -1})
            .exec((err, data) => {
                if (err) {
                    res.status(400).json({
                        message: 'Error Occurred fetching all comments',
                        error: err
                    });
                } else {
                    res.status(200).json({
                        message: 'All comments fetched successfully',
                        data: data
                    });
                }
            });
    },

    createNewComment: (req, res) => {
        const comment = req.body;
        Comment.create(comment, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: err.errors[Object.keys(err.errors)[0]].message || 'Error occurred Creating comment',
                    error: err,
                })
            } else {
                res.status(201).json({
                    message: 'Comment Created Successfully. Received JSON object to save',
                    user: data
                });
            }
        });

    },

    getCommentById: (req, res) => {
        const id = req.params.id;
        Comment.findById(id, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: 'Data resource unavailable, wrong ID'
                });
            } else {
                res.status(200).json({
                    message: 'Data found',
                    data: data
                });
            }
        })
    },

    getCommentByBlogId: (req, res) => {
        const id = req.params.id;
        Comment.find({blog_id: id}, {})
            .sort({$natural: -1})
            .exec((err, data) => {
                if (err) {
                    res.status(400).json({
                        message: 'Data resource unavailable, wrong ID'
                    });
                } else {
                    res.status(200).json({
                        message: 'Data found',
                        data: data
                    });
                }
            });
    },

    updateComment: (req, res) => {
        const id = req.params.id;
        Comment.findByIdAndUpdate(id, {$set: req.body}, {new: true}, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: 'Data resource unavailable, wrong ID',
                    error: err
                });
            } else {
                res.status(200).json({
                    message: 'Category data found and updated successfully',
                    data: data
                });
            }
        })

    },

    deleteComment: (req, res) => {
        const id = req.params.id;
        Comment.findByIdAndRemove(id, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: 'Data resource unavailable, wrong ID',
                    error: err
                });
            } else {
                res.status(200).json({
                    message: 'Category deleted successfully',
                    data: data
                });
            }
        });
    }

};

module.exports = CommentsController;
