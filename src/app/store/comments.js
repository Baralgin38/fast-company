import { createAction, createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';
import { nanoid } from 'nanoid';

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
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentCreateFailed: (state, action) => {
      state.error = action.payload;
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
    },
    commentDeleteFailed: (state, action) => {
      state.error = action.payload;
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentCreateFailed,
  commentDeleted,
  commentDeleteFailed
} = actions;

const commentCreateRequest = createAction('comments/commentCreateRequest');
const commentDeleteRequest = createAction('comments/commentDeleteRequest');

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());

  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment =
  ({ data, pageId, userId }) =>
  async (dispatch) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId,
      created_at: Date.now(),
      userId
    };

    dispatch(commentCreateRequest());

    try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
    } catch (error) {
      dispatch(commentCreateFailed(error.message));
    }
  };

export const deleteComment = (id) => async (dispatch) => {
  dispatch(commentDeleteRequest());

  try {
    await commentService.removeComment(id);
    dispatch(commentDeleted(id));
  } catch (error) {
    dispatch(commentDeleteFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
