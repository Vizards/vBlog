/**
 * Created by Vizards on 16/4/28.
 * File: models/post.js
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    author: {
        type: String,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: String,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Post',PostSchema);

