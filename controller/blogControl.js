const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// Blog entry controls here
const blogEntry = (req, res, next) => {
    const { title, author, post, url } = req.body;

        const newEntry = new Blog ({
            title,
            author,
            post,
            url
        })
        newEntry.save((err) => {
            if (err) {
                return next(err)
            } else {
                return res.status(201).json({
                    message: "New Story created"
                })
            }
        })
    }


// Blog update
const blogUpdate = (req, res) => {
    const { title, author, post } = req.body;
    if ( req.user !== true) {
        return res.status(401).json({
            message: "You are not an admin"
        })
    } else {
        Blog.findByIdAndUpdate( req.params.id, { title: title, author: author, post: post }, (err, data) => {
            if (err) return next(err);
            if (!data) {
                return res.status(401).json({
                    message: "No Blog entry for this id"
                })
            } else {
                return res.status(201).json({
                    message: "Story Updated"
                })
            }
        })
    }
}

// Deleting a post
const blogDelete = (req, res) => {
    if ( req.user !== true) {
        return res.status(401).json({
            message: "You need to be an admin to post a story"
        })
    } else {
        Blog.delete( req.params.id, (err, data) => {
            if (err) return next(err);
            if (!data) {
                return res.status(401).json({
                    message: "No Blog entry for this id"
                })
            } else {
                return res.status(201).json({
                    message: "Story Deleted"
                })
            }
        })
    }
}

// Display stories
const blogDisplay = (req, res, next) => {
    Blog.find(({}),(err, data) => {
        if (err) return next (err)
        res.status(200).json({
            message:"Stories here",
            data
        })
    
    })
}


// Blog display one
// const blogDisplayOne = async(req, res, next) => {
//     try {
//         const id = req.params.id
//         const data = await Blog.findOne({_id: id });
//         res.status(200).json({ data });
//     } 
//     catch(err) {
//         return next(err)
//     }
//   }
const blogDisplayOne = (req, res, next) => {
    Blog.findById( req.params.id, (err, data) => {
        if (err) return next (err)
        res.status(200).json({
            message: "Your Story",
            data
        })
    })
}

module.exports = { blogEntry, blogUpdate, blogDelete, blogDisplay, blogDisplayOne};