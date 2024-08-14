import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 800,
        margin: 'auto',
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        boxShadow: 1,
      }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your comment"
        required
        variant="outlined"
        multiline
        rows={4}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'flex-start' }}
      >
        POST
      </Button>
    </Box>
  );
};

export default CommentForm;
