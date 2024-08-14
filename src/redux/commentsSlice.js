import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
  },
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    editComment: (state, action) => {
      const index = state.comments.findIndex(comment => comment.id === action.payload.id);
      if (index !== -1) {
        state.comments[index].text = action.payload.text;
      }
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload.id);
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { addComment, editComment, deleteComment, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
