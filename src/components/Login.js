// frontend/src/components/Login.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Обработчик формы входа
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка, что поля заполнены
    if (!username || !password) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      // Запрос на авторизацию пользователя
      const response = await axios.post('http://localhost:5000/api/login', { username, password });

      // Проверка на успешный ответ
      if (response.status === 200) {
        // Сохранение токена и перенаправление
        localStorage.setItem('token', response.data.token);
        setError('');
        navigate('/dashboard');
      }
    } catch (err) {
      // Обработка ошибок
      if (err.response && err.response.status === 401) {
        setError('Неверные учетные данные.');
      } else {
        setError('Ошибка при авторизации. Попробуйте снова.');
      }
      console.error('Ошибка авторизации:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Войти</button>
      </form>
      <div className="register-link">
        <p>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
