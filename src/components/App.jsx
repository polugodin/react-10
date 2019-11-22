import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPostsAction, signInAction, signOutAction } from '../actions';
import { getPosts, signIn, showError } from '../../sources';

import './App.css';

import Post from './Post';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import PostModal from './PostModal';
import logo from '../../sources/ui/logo.svg';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const { isSignIn, fullName, login, password, userId, email } = useSelector(state => state);

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postModalData, setPostModalData] = useState(null);
  const [showAppMessage, setShowAppMessage] = useState(false);
  const [appMessage, setAppMessage] = useState('');
  const [appMessageTimer, setAppMessageTimer] = useState(null);
  const [showMoreUserInfo, setShowMoreUserInfo] = useState(false);

  const newAppMessage = text => {
    setAppMessage(text);
    setShowAppMessage(true);
    if (appMessageTimer) clearTimeout(appMessageTimer);
    setAppMessageTimer(
      setTimeout(() => {
        setShowAppMessage(false);
        setAppMessage('');
        setAppMessageTimer(null);
      }, 2000)
    );
  };

  const signoutHandler = () => {
    dispatch(signOutAction());
    localStorage.removeItem('user');
    newAppMessage('Выполнен выход');
    setShowMoreUserInfo(false);
  };

  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (user) {
      signIn(user.login, user.password)
        .then(() => dispatch(signInAction(user)))
        .catch(() => localStorage.removeItem('user'));
    }
    getPosts()
      .then(({ data }) => {
        dispatch(getPostsAction(data));
      })
      .catch(showError);
  }, []);

  useEffect(() => {
    if (login) {
      localStorage.setItem('user', JSON.stringify({ userId, login, password, fullName, email }));
    }
  }, [login]);

  return (
    <>
      {showSignInModal && (
        <SignInModal
          closeSignInModal={() => setShowSignInModal(false)}
          switchToSignUp={() => {
            setShowSignInModal(false);
            setShowSignUpModal(true);
          }}
          newAppMessage={newAppMessage}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          closeSignUpModal={() => setShowSignUpModal(false)}
          switchToSignIn={() => {
            setShowSignUpModal(false);
            setShowSignInModal(true);
          }}
          newAppMessage={newAppMessage}
        />
      )}
      {showPostModal && (
        <PostModal
          post={postModalData}
          closePostModal={() => {
            setShowPostModal(false);
            setPostModalData(null);
          }}
          newAppMessage={newAppMessage}
        />
      )}

      <main className="main">
        {showAppMessage && (
          <div className="app-message">
            <div className="app-message__text">{appMessage}</div>
          </div>
        )}

        <section className="header-container">
          <header className="header header-container__header">
            <img className="header__logo" src={logo} />
            <div className="header__controls-container">
              {isSignIn && login && fullName ? (
                <>
                  <div onClick={() => setShowMoreUserInfo(!showMoreUserInfo)} className="header__user-info">
                    <div className="header__user-more"></div>
                    <span className="header__login">{`${fullName} (@${login})`}</span>
                    {showMoreUserInfo && (
                      <div className="header__user-more-panel">
                        <div className="header__user-more-panel__field">{`id: ${userId}`}</div>
                        <div className="header__user-more-panel__field">{`email: ${email}`}</div>
                      </div>
                    )}
                  </div>
                  <button className="header__control header__control_sign-out" onClick={signoutHandler}>
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <button className="header__control header__control_sign-in" onClick={() => setShowSignInModal(true)}>
                    Войти
                  </button>

                  <button className="header__control header__control_sign-up" onClick={() => setShowSignUpModal(true)}>
                    Зарегистрироваться
                  </button>
                </>
              )}
            </div>
          </header>
        </section>

        <section className="posts-container">
          <div className="posts-layout posts-container__posts-layout">
            {posts.map(post => (
              <Post
                key={post.id}
                post={post}
                openPostModalHandler={() => {
                  setPostModalData(post);
                  setShowPostModal(true);
                }}
                newAppMessage={newAppMessage}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
