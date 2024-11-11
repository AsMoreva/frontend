import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Ваши стили для страницы регистрации

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Обработчик формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Простая валидация
    if (!email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    try {
      // Здесь можно добавить реальную логику регистрации, например через API.
      // Для примера, просто перенаправим на страницу входа.
      setError(''); // Очистим ошибку
      navigate('/login'); // Перенаправление на страницу входа
    } catch (err) {
      setError('Ошибка при регистрации. Попробуйте снова.');
    }
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="input-container">
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
