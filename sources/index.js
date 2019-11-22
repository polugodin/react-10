import React from 'react';
import Axios from 'axios';

const getPosts = () => Axios.get('/posts');
const signUp = user => Axios.post('/signUp', user);
const signIn = (loginOrEmail, password) => Axios.get('/signIn', { params: { loginOrEmail, password } });
const setLike = (userId, password, postId) => Axios.put('/setLike', { userId, password, postId });
const getUserNames = usersId => Axios.get('/getUserNames', { params: { usersId } });
const newComment = commet => Axios.post('/newComment', commet);
const deleteComment = (userId, password, postId, commentId) =>
  Axios.delete('/deleteComment', { params: { userId, password, postId, commentId } });

const showError = err => console.error(err);

const formatHashTags = text =>
  text.split(/(?=#)|(?<=#\w+\b)/).map((item, index) =>
    item[0] === '#' ? (
      <span key={index} className="post__hashtag">
        {item}
      </span>
    ) : (
      item
    )
  );

export { getPosts, signUp, signIn, setLike, getUserNames, showError, newComment, deleteComment, formatHashTags };
