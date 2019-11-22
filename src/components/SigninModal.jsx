import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { signInAction } from '../actions';
import { signIn } from '../../sources';

import './SignModal.css';

const SignInModal = ({ closeSignInModal, switchToSignUp, newAppMessage }) => {
  const dispatch = useDispatch();

  const onSubmit = values => {
    signIn(values.loginOrEmail, values.password)
      .then(({ data }) => {
        dispatch(signInAction(data));
        closeSignInModal();
        newAppMessage('Выполнен вход');
      })
      .catch(() => newAppMessage('Ошибка входа'));
  };

  return (
    <section className="sign-modal-container" onClick={closeSignInModal}>
      <div className="sign-modal sign-modal-container__sign-modal" onClick={e => e.stopPropagation()}>
        <div className="sign-modal__hint">
          <span className="sign-modal__hint__text">Нет акаунта?</span>
          <button className="sign-modal__hint__link" type="button" onClick={switchToSignUp}>
            Зарегистрируйтесь
          </button>
        </div>

        <div className="sign-modal__title">Вход</div>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="sign-modal__input-container">
                <Field
                  className="sign-modal__input-container__input"
                  name="loginOrEmail"
                  component="input"
                  type="text"
                  required
                  autoComplete="off"
                />
                <label className="sign-modal__input-container__label">Имя пользователя или email</label>
              </div>

              <div className="sign-modal__input-container">
                <Field
                  className="sign-modal__input-container__input"
                  name="password"
                  component="input"
                  type="password"
                  required
                  autoComplete="off"
                />
                <label className="sign-modal__input-container__label">Пароль</label>
              </div>

              <button className="sign-modal__submit" type="submit">
                Войти
              </button>
            </form>
          )}
        />
      </div>
    </section>
  );
};

export default SignInModal;
