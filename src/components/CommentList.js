import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onEdit, onDelete, onReply, toggleSortOrder, isAscending }) => {
  return (
    <div className="comment-list">
      <div className="sort-bar">
        <button onClick={toggleSortOrder}>
          Sort By: Date and Time {isAscending ? '↓' : '↑'}
        </button>
      </div>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

export default CommentList;
