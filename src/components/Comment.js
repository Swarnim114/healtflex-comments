import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, IconButton, Button, TextField, Paper } from '@mui/material';

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
    <Paper elevation={1} sx={{ padding: 2, marginBottom: 2, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" fontWeight="bold">
          {comment.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(comment.date).toLocaleString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })}
        </Typography>
        <IconButton
          onClick={() => onDelete(comment.id)}
          size="small"
          color="error"
          sx={{
            position: 'absolute',
            right: -12,
            top: '1%',
            transform: 'translateY(-50%)',
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Box>
      {isEditing ? (
        <TextField
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          sx={{ marginTop: 1 }}
        />
      ) : (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {comment.text}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 2, marginTop: 1 }}>
        <Button variant="text" size="small" onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        <Button variant="text" size="small" onClick={() => setIsReplying(!isReplying)}>
          Reply
        </Button>
      </Box>
      {isReplying && (
        <Box sx={{ marginTop: 2 }}>
          <CommentForm onSubmit={(reply) => handleReply({ ...reply, id: Math.random().toString(36).substr(2, 9), parentId: comment.id })} parentId={comment.id} />
        </Box>
      )}
      {comment.replies && comment.replies.map((reply) => (
        <Box key={reply.id} sx={{ marginLeft: 3, marginTop: 2 ,}}>
          <Comment
            comment={reply}
            onEdit={onEdit}
            onDelete={onDelete}
            onReply={onReply}
          />
        </Box>
      ))}
    </Paper>
  );
};

export default Comment;
