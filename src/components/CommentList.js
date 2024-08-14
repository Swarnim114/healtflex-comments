import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onEdit, onDelete, onReply, toggleSortOrder, isAscending }) => {
  return (
    <div>
      <div className="sort-bar">
        <button onClick={toggleSortOrder}>
          Sort by date: {isAscending ? 'Ascending' : 'Descending'}
        </button>
      </div>
      {comments.map((comment) => (
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
