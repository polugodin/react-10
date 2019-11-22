import { APP_ACTIONS } from './constants';

const initialState = {
  isSignIn: false,

  userId: null,
  login: null,
  password: null,
  fullName: null,
  email: null,

  posts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_ACTIONS.GET_POSTS:
      return { ...state, posts: action.posts };

    case APP_ACTIONS.SIGN_IN:
      return { posts: [...state.posts], isSignIn: true, ...action.user };

    case APP_ACTIONS.SIGN_OUT:
      return { ...initialState, posts: [...state.posts] };

    case APP_ACTIONS.SET_LIKE: {
      const _posts = [...state.posts];
      const index = _posts.findIndex(post => post.id === action.postId);
      if (_posts[index].likes.includes(action.userId))
        _posts[index].likes = _posts[index].likes.filter(id => id !== action.userId);
      else _posts[index].likes.push(action.userId);
      return { ...state, posts: _posts };
    }

    case APP_ACTIONS.NEW_COMMENT: {
      const _posts = [...state.posts];
      const postIndex = _posts.findIndex(post => post.id === action.postId);
      _posts[postIndex].comments.push(action.comment);
      return { ...state, posts: _posts };
    }

    case APP_ACTIONS.DELETE_COMMENT: {
      const _posts = [...state.posts];
      const postIndex = _posts.findIndex(post => post.id === action.postId);
      _posts[postIndex].comments = _posts[postIndex].comments.filter(comment => comment.id !== action.commentId);
      return { ...state, posts: _posts };
    }

    default:
      return state;
  }
};

export default reducer;
