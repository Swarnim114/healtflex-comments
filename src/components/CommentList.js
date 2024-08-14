import React from 'react';
import Comment from './Comment';
import { Box, Button, Typography } from '@mui/material';

const CommentList = ({ comments, onEdit, onDelete, onReply, toggleSortOrder, isAscending }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleSortOrder}
        >
          Sort by date: {isAscending ? 'Ascending' : 'Descending'}
        </Button>
      </Box>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}
    </Box>
  );
};

export default CommentList;
