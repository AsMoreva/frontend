import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError('Все поля обязательны');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      setError('');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000); // Перенаправление после успешной регистрации
    } catch (err) {
      console.error(err);
      setError('Не удалось зарегистрировать. Пожалуйста, попробуйте снова');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Регистрация
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Регистрация прошла успешно! Перенаправляем на вход..
          </Alert>
        )}
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
          <TextField
            fullWidth
            margin="normal"
            label="Подтвердите пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Зарегистрироваться
          </Button>
        </Box>
        <Typography mt={2}>
          У вас уже есть аккаунт?{' '}
          <Button
            variant="text"
            onClick={() => navigate('/login')}
            sx={{ textTransform: 'none', padding: 0 }}
          >
            Войдите здесь
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
