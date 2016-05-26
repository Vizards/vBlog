/**
 * Created by Vizards on 16/5/6.
 * File: models/comment.js
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment',CommentSchema);
