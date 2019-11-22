import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { setLikeAction, newCommentAction, deleteCommentAction } from '../actions';
import { getUserNames, formatHashTags, setLike, newComment, deleteComment, showError } from '../../sources';

import './PostModal.css';

import like from '../../sources/ui/like.svg';
import likeActive from '../../sources/ui/like-active.svg';
import comment from '../../sources/ui/comment.svg';

const PostModal = ({ post, closePostModal, newAppMessage }) => {
  const dispatch = useDispatch();
  const { isSignIn, userId, fullName, password } = useSelector(state => state);
  const [userNames, setUserNames] = useState(null);

  const isLike = isSignIn ? post.likes.includes(userId) : false;

  const likeClickHandler = () => {
    if (!isSignIn) {
      newAppMessage('Необходимо войти');
      return;
    }
    setLike(userId, password, post.id)
      .then(() => dispatch(setLikeAction(userId, post.id)))
      .catch(showError);
  };

  const deleteCommentHandler = ({ postId, commentId }) => {
    deleteComment(userId, password, postId, commentId)
      .then(() => dispatch(deleteCommentAction(postId, commentId)))
      .catch(showError);
  };

  const onSubmit = values => {
    const sendData = { ...values, postId: post.id };
    return newComment(sendData)
      .then(({ data }) => {
        dispatch(newCommentAction(post.id, data));
      })
      .then(() => updateUserNames())
      .catch(() => {
        newAppMessage(`Ошибка. Возможно пользователь ${values.autor} не зарегистрирован`);
      });
  };

  const updateUserNames = () => {
    const userIds = post.comments.map(({ userId }) => userId);
    getUserNames(userIds).then(({ data }) => setUserNames(data));
  };

  useEffect(() => {
    updateUserNames();
  }, []);

  return (
    <section className="post-modal-container" onClick={closePostModal}>
      <div className="post-modal post-modal-container__post-modal" onClick={e => e.stopPropagation()}>
        <div className="post-modal__content">
          <img className="post-modal__content__image" src={'/img' + post.img} />
          <div className="post-modal__content__description">{formatHashTags(post.description)}</div>

          <div className="post-modal__content__controls-container">
            <button
              onClick={likeClickHandler}
              className="post-modal__content__control post-modal__content__control_likes"
            >
              <img className="post-modal__content__control__icon" src={isLike ? likeActive : like} />
              {post.likes.length}
            </button>
            <button className="post-modal__content__control post-modal__content__control_comments" disabled>
              <img className="post-modal__content__control__icon" src={comment} />
              {post.comments.length}
            </button>
          </div>
        </div>

        {userNames && (
          <div className="post-modal__comments-container">
            {post.comments.map(comm => (
              <div key={comm.id} className="post-modal__comment">
                <span className="post-modal__comment__username">{userNames['user' + comm.userId]}</span>
                <span className="post-modal__comment__comment-text">{comm.comment}</span>
                {isSignIn && comm.userId === userId && (
                  <button
                    className="post-modal__comment__delete"
                    onClick={() => deleteCommentHandler({ postId: post.id, commentId: comm.id })}
                  ></button>
                )}
              </div>
            ))}

            <Form
              onSubmit={onSubmit}
              initialValues={{ autor: fullName || '' }}
              render={({ handleSubmit, form, submitting, pristine }) => (
                <form
                  onSubmit={event => {
                    handleSubmit(event).then(form.reset);
                  }}
                >
                  <div className="post-modal__input-container">
                    <Field
                      className="post-modal__input-container__input"
                      component="input"
                      type="text"
                      name="autor"
                      required
                      autoComplete="off"
                    />
                    <label className="post-modal__input-container__label">author</label>
                  </div>

                  <div className="post-modal__input-container">
                    <Field
                      className="post-modal__input-container__input"
                      component="input"
                      type="text"
                      name="comment"
                      required
                      autoComplete="off"
                    />
                    <label className="post-modal__input-container__label">comment</label>
                  </div>

                  <div className="post-modal__control-container">
                    <button className="post-modal__submit" type="submit">
                      Отправить
                    </button>
                    <button
                      className="post-modal__reset"
                      type="button"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PostModal;
