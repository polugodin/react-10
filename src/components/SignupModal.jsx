import React from 'react';
import { Form, Field } from 'react-final-form';

import { signUp, showError } from '../../sources';

import './SignModal.css';

const SignUpModal = ({ closeSignUpModal, switchToSignIn, newAppMessage }) => {
  const onSubmit = values => {
    signUp(values)
      .then(() => {
        closeSignUpModal();
        newAppMessage(`Пользователь ${values.login} зарегистрирован`);
      })
      .catch(showError);
  };

  return (
    <section className="sign-modal-container" onClick={closeSignUpModal}>
      <div className="sign-modal sign-modal-container__sign-modal" onClick={e => e.stopPropagation()}>
        <div className="sign-modal__hint">
          <span className="sign-modal__hint__text">Уже зарегистрированы?</span>
          <button className="sign-modal__hint__link" type="button" onClick={switchToSignIn}>
            Войдите
          </button>
        </div>

        <div className="sign-modal__title">Регистрация</div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="sign-modal__input-container">
                <Field
                  className="sign-modal__input-container__input"
                  name="fullName"
                  component="input"
                  type="text"
                  required
                  autoComplete="off"
                />
                <label className="sign-modal__input-container__label">Полное имя</label>
              </div>

              <div className="sign-modal__input-container">
                <Field
                  className="sign-modal__input-container__input"
                  name="login"
                  component="input"
                  type="text"
                  required
                  autoComplete="off"
                />
                <label className="sign-modal__input-container__label">Имя пользователя</label>
              </div>

              <div className="sign-modal__input-container">
                <Field
                  className="sign-modal__input-container__input"
                  name="email"
                  component="input"
                  type="email"
                  required
                  autoComplete="off"
                />
                <label className="sign-modal__input-container__label">Email</label>
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
                Зарегистрироваться
              </button>
            </form>
          )}
        />
      </div>
    </section>
  );
};

export default SignUpModal;
