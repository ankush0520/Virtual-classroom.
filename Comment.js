// models/Comment.js (Using Mongoose)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  userId: String,
  lectureId: String,
  parentCommentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Comment', CommentSchema);

// controllers/commentController.js
const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const { content, lectureId, parentCommentId } = req.body;
  const comment = new Comment({
    content,
    userId: req.user.id,
    lectureId,
    parentCommentId
  });

  await comment.save();
  res.status(201).json(comment);
};

// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Add a comment to a lecture
router.post('/', auth, addComment);

module.exports = router;
