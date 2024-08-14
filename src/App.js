import React, { useState, useEffect } from 'react';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, editComment, deleteComment, setComments } from './redux/commentsSlice';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments) || [];
  const [isAscending, setIsAscending] = useState(true);

  // Load comments from localStorage on initial render
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments'));
    if (storedComments) {
      dispatch(setComments(storedComments));
    }
  }, [dispatch]);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length) {
      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }, [comments]);

  const handleAddComment = (comment) => {
    dispatch(addComment({ ...comment, id: Math.random().toString(36).substr(2, 9), replies: [] }));
  };

  const handleEditComment = (id, text) => {
    dispatch(editComment({ id, text }));
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  const handleReplyComment = (reply) => {
    dispatch(addComment(reply));
  };

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const sortedComments = [...comments].sort((a, b) => {
    return isAscending
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="App">
      <CommentForm onSubmit={handleAddComment} />
      <CommentList
        comments={sortedComments}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        onReply={handleReplyComment}
        toggleSortOrder={toggleSortOrder}
        isAscending={isAscending}
      />
    </div>
  );
};

export default App;
