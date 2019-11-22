import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLikeAction } from '../actions';
import { formatHashTags, setLike, showError } from '../../sources';

import like from '../../sources/ui/like.svg';
import likeActive from '../../sources/ui/like-active.svg';
import bigLike from '../../sources/ui/big-like.svg';
import comment from '../../sources/ui/comment.svg';

const Post = ({ post, openPostModalHandler, newAppMessage }) => {
  const dispatch = useDispatch();
  const isSignIn = useSelector(state => state.isSignIn);
  const userId = useSelector(state => state.userId);
  const password = useSelector(state => state.password);

  const isLike = isSignIn ? post.likes.includes(userId) : false;
  const [isBigLikeVisible, setIsBigLikeVisible] = useState(false);
  const [isBigLikeFade, setIsBigLikeFade] = useState(false);
  const [bigLikeTimer, setBigLikeTimer] = useState(false);

  const likeClickHandler = () => {
    if (!isSignIn) {
      newAppMessage('Необходимо войти');
      return;
    }

    setLike(userId, password, post.id)
      .then(() => {
        dispatch(setLikeAction(userId, post.id));
        if (!isLike && !bigLikeTimer) {
          setIsBigLikeVisible(true);
          setIsBigLikeFade(true);
          setBigLikeTimer(
            setTimeout(() => {
              setIsBigLikeFade(false);
              setIsBigLikeVisible(false);
              setBigLikeTimer(false);
            }, 1000)
          );
        }
      })
      .catch(showError);
  };

  return (
    <article className="post">
      <div className="post__image-container" onClick={openPostModalHandler}>
        <div
          className={
            isBigLikeVisible ? 'post__big-like-container post__big-like-container_visible' : 'post__big-like-container'
          }
        >
          <div className={isBigLikeFade ? 'post__big-like post__big-like_fade' : 'post__big-like'}>
            <img src={bigLike} />
            <div className="post__big-like-number">{post.likes.length}</div>
          </div>
        </div>
        <img className="post__image" src={'/img' + post.img} />
      </div>

      <div className="post__short-description">{formatHashTags(post.shortDescription)}</div>
      <div className="post__control-container">
        <button onClick={likeClickHandler} className="post__control post__control_like">
          <img className="post__control__icon" src={isLike ? likeActive : like} />
          {post.likes.length}
        </button>
        <button className="post__control post__control_comment" onClick={openPostModalHandler}>
          <img className="post__control__icon" src={comment} />
          {post.comments.length}
        </button>
      </div>
    </article>
  );
};

export default Post;
