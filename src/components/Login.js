import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setError('');
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Неверные учетные данные.');
      } else {
        setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Вход
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            fullWidth
            margin="normal"
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Войти
          </Button>
        </Box>
        <Typography mt={2}>
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
