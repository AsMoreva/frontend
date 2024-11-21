import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Инициализируем navigate

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Новый пароль и подтверждение не совпадают');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Пароль успешно обновлен');
      setError('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Ошибка при изменении пароля:', err);
      setError('Ошибка при изменении пароля. Попробуйте снова.');
    }
  };

  // Функция для возврата на предыдущую страницу
  const handleGoBack = () => {
    navigate(-1); // Возвращает на предыдущую страницу
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h5" gutterBottom>Изменить пароль</Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Старый пароль"
        type="password"
        fullWidth
        margin="normal"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <TextField
        label="Новый пароль"
        type="password"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <TextField
        label="Подтверждение нового пароля"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button 
        onClick={handleChangePassword} 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 2 }}
      >
        Изменить пароль
      </Button>
      <Button
        onClick={handleGoBack} // Обработчик нажатия на кнопку
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Вернуться назад
      </Button>
    </Box>
  );
};

export default ChangePassword;
