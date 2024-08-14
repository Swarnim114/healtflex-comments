import React, { useState } from 'react';

const Comment = ({ comment, onEdit, onDelete, onReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');

  const handleEdit = () => {
    if (isEditing) {
      onEdit(comment.id, newText);
    }
    setIsEditing(!isEditing);
  };

  const handleReply = () => {
    if (replyName && replyText) {
      onReply({
        id: Math.random().toString(36).substr(2, 9),
        name: replyName,
        text: replyText,
        parentId: comment.id,
        date: new Date().toISOString(),
      });
      setReplyText('');
      setReplyName('');
      setIsReplying(false);
    } else {
      alert('Please enter both name and reply text');
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.name}</strong>
        <span className="date">{new Date(comment.date).toLocaleDateString()}</span>
      </div>
      {isEditing ? (
        <textarea value={newText} onChange={(e) => setNewText(e.target.value)} className="edit-textarea"/>
      ) : (
        <p>{comment.text}</p>
      )}
      <div className="comment-actions">
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => onDelete(comment.id)}>Delete</button>
        <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
      </div>
      {isReplying && (
        <div className="reply-form">
          <input
            type="text"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            placeholder="Name"
            className="input"
          />
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply"
            className="textarea"
          />
          <button onClick={handleReply} className="post-button">POST</button>
        </div>
      )}
      {comment.replies && comment.replies.map(reply => (
        <Comment key={reply.id} comment={reply} onEdit={onEdit} onDelete={onDelete} onReply={onReply} />
      ))}
    </div>
  );
};

export default Comment;
