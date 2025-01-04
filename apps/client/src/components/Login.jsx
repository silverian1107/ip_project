import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/queries/use-auth';
import '../styles/Login.css';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const login = useLogin();
  const { t } = useTranslation('login-form');

  const onSubmit = async (data) => {
    await login.mutateAsync(data);
  };

  return (
    <div className="auth-container">
      <h1 className="auth-logo">DramaSphere</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="usernameOrEmail">{t('id')}</label>
        <input
          {...register('usernameOrEmail', {
            required: t('validation.idRequired')
          })}
          id="usernameOrEmail"
          type="text"
          placeholder={t('id')}
          className="text-black"
        />
        {errors.usernameOrEmail && (
          <p className="error-message">{errors.usernameOrEmail.message}</p>
        )}

        <label htmlFor="password">{t('password')}</label>
        <div className="password-container">
          <input
            {...register('password', {
              required: t('validation.passwordRequired')
            })}
            id="password"
            type="password"
            placeholder={t('password')}
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={() => {
              const input = document.getElementById('password');
              input.type = input.type === 'password' ? 'text' : 'password';
            }}
          >
            SHOW
          </button>
        </div>
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <button type="submit" className="auth-button">
          {t('login')}
        </button>

        <div className="auth-links">
          <span>{t('notMember')} </span>
          <u
            onClick={() => navigate('/signup')}
            style={{ cursor: 'pointer', color: '#1e90ff' }}
          >
            {t('signUp')}
          </u>
        </div>
      </form>
    </div>
  );
}

export default Login;
