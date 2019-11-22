import { APP_ACTIONS } from './constants';

const getPostsAction = posts => ({
  type: APP_ACTIONS.GET_POSTS,
  posts
});

const signInAction = user => ({
  type: APP_ACTIONS.SIGN_IN,
  user
});

const signOutAction = () => ({
  type: APP_ACTIONS.SIGN_OUT
});

const setLikeAction = (userId, postId) => ({
  type: APP_ACTIONS.SET_LIKE,
  userId,
  postId
});

const newCommentAction = (postId, comment) => ({
  type: APP_ACTIONS.NEW_COMMENT,
  postId,
  comment
});

const deleteCommentAction = (postId, commentId) => ({
  type: APP_ACTIONS.DELETE_COMMENT,
  postId,
  commentId
});

export { getPostsAction, signInAction, signOutAction, setLikeAction, deleteCommentAction, newCommentAction };
