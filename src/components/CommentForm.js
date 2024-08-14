import React, { useState } from 'react';

const CommentForm = ({ onSubmit, parentId = null }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && text) {
      onSubmit({ name, text, parentId, date: new Date().toISOString(), replies: [] });
      setName('');
      setText('');
    } else {
      alert('Please enter both name and comment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="input"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Comment"
        required
        className="textarea"
      />
      <button type="submit" className="post-button">POST</button>
    </form>
  );
};

export default CommentForm;
