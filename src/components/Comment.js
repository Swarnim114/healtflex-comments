import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ comment, onEdit, onDelete, onReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(comment.id, newText);
    }
    setIsEditing(!isEditing);
  };

  const handleReply = (reply) => {
    onReply(reply);
    setIsReplying(false);
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.name}</strong>
        <span className="date">
          {new Date(comment.date).toLocaleString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })}
        </span>
        <FontAwesomeIcon
          icon={faTrash}
          className="delete-icon"
          onClick={() => onDelete(comment.id)}
        />
      </div>
      {isEditing ? (
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="edit-textarea"
        />
      ) : (
        <p>{comment.text}</p>
      )}
      <div className="comment-actions">
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
      </div>
      {isReplying && (
        <CommentForm onSubmit={(reply) => handleReply({ ...reply, id: Math.random().toString(36).substr(2, 9), parentId: comment.id })} parentId={comment.id} />
      )}
      {comment.replies && comment.replies.map((reply) => (
        <div key={reply.id} className="nested-comment">
          <Comment
            comment={reply}
            onEdit={onEdit}
            onDelete={onDelete}
            onReply={onReply}
          />
        </div>
      ))}
    </div>
  );
};

export default Comment;
