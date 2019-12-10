const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: String,
    message: { type: String, required: true },
    author: { type: String, required: true },
    blog_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
