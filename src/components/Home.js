import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="limiter">
      <div className="container-home">
        <div className="wrap-home">
          <span className="home-title">
            Добро пожаловать
            <br />в приложение для анализа доходов и расходов
          </span>
          <div className="text-center">
            <span className="txt1">
              Это приложение поможет вам отслеживать ваши доходы и расходы,
              анализировать финансовое состояние и достигать поставленных целей.
            </span>
            <br />
            <span className="txt2">
              Чтобы начать, пожалуйста, зарегистрируйтесь или войдите в свою учетную запись.
            </span>
          </div>
          <div className="container-home-form-btn">
            <button type="button" onClick={handleLogin} className="home-form-btn">
              Вход
            </button>
          </div>
          <div className="container-home-form-btn">
            <button type="button" onClick={handleRegister} className="home-form-btn">
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
