import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
  },
  reducers: {
    addComment: (state, action) => {
      const { parentId, ...newComment } = action.payload;
      if (parentId === null) {
        state.comments.push(newComment);
      } else {
        const addReply = (comments) => {
          for (let comment of comments) {
            if (comment.id === parentId) {
              comment.replies.push(newComment);
              return;
            }
            if (comment.replies.length) {
              addReply(comment.replies);
            }
          }
        };
        addReply(state.comments);
      }
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const editCommentRecursively = (comments) => {
        for (let comment of comments) {
          if (comment.id === id) {
            comment.text = text;
            return;
          }
          if (comment.replies.length) {
            editCommentRecursively(comment.replies);
          }
        }
      };
      editCommentRecursively(state.comments);
    },
    deleteComment: (state, action) => {
      const deleteCommentRecursively = (comments, id) => {
        return comments.filter(comment => {
          if (comment.id === id) return false;
          if (comment.replies.length) {
            comment.replies = deleteCommentRecursively(comment.replies, id);
          }
          return true;
        });
      };
      state.comments = deleteCommentRecursively(state.comments, action.payload);
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { addComment, editComment, deleteComment, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
