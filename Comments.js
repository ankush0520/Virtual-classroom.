// components/Comments.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Comments = ({ lectureId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch existing comments
    const fetchComments = async () => {
      const res = await axios.get(`/api/comments/${lectureId}`);
      setComments(res.data);
    };
    fetchComments();

    // Listen for new comments
    socket.on('newComment', (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    return () => socket.off('newComment');
  }, [lectureId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = { content: newComment, lectureId };
    await axios.post('/api/comments', comment);
    socket.emit('newComment', comment);
    setNewComment('');
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;
