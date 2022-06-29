import { createAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import commentService from '../services/comment.service';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (state.entities) {
        state.entities.push(action.payload);
      }
    },
    commentCreatedFailed: (state, action) => {
      state.error = action.payload;
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter(i => i._id !== action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentCreatedFailed,
  commentRemoved
} = actions;

const commentRemovedFailed = createAction('comments/removedFailed');

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
      const { content } = await commentService.getComments(userId);
      dispatch(commentsReceived(content));
    } catch (error) {
      dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (payload, userId, currentUserId) => async (dispatch) => {
  const comment = {
    ...payload,
    pageId: userId,
    created_at: Date.now(),
    userId: currentUserId,
    _id: nanoid()
  };
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentCreatedFailed(error.message));
  };
};

export const removeComment = (commentId) => async (dispatch, getState) => {
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content == null) {
      dispatch(commentRemoved(commentId));
    }
  } catch (error) {
    dispatch(commentRemovedFailed());
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoading = () => (state) => state.comments.isLoading;

export default commentsReducer;
