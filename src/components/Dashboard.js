import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке транзакций:', error);
        setError('Не удалось загрузить транзакции. Пожалуйста, войдите снова.');
      }
    };
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const newTransaction = { type, amount: parseFloat(amount), description, date };
      const response = await axios.post('http://localhost:5000/api/transactions', newTransaction, {
        headers: { Authorization: `Bearer ${token}` }, // Убедитесь, что здесь есть точка с запятой
      });
      setTransactions([...transactions, response.data]);
      setAmount('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error('Ошибка при добавлении транзакции:', error);
      setError('Не удалось добавить транзакцию.');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении транзакции:', error);
      setError('Не удалось удалить транзакцию.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChangePasswordRedirect = () => {
    navigate('/change-password');
  };

  const incomeTotal = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: ['Доход', 'Расходы'],
    datasets: [
      {
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['#4CAF50', '#FF6384'],
      },
    ],
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom align="center">
          Ваши транзакции
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Выйти
          </Button>
          <Button variant="contained" color="primary" onClick={handleChangePasswordRedirect}>
            Изменить пароль
          </Button>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box component="form" onSubmit={handleAddTransaction} sx={{ mb: 4 }}>
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="space-between">
            <TextField
              select
              label="Тип"
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
            >
              <MenuItem value="income">Доход</MenuItem>
              <MenuItem value="expense">Расход</MenuItem>
            </TextField>

            <TextField
              type="number"
              label="Сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />

            <TextField
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              required
            />
          </Box>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Добавить транзакцию
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Тип</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.type === 'income' ? 'Доход' : 'Расход'}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom align="center">
            Доходы против Расходов
          </Typography>
          <Box width="50%" mx="auto">
            <Doughnut data={data} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
