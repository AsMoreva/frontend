// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2'; // Импортируем Doughnut для круговой диаграммы
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

// Регистрация компонентов для Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Ошибка загрузки данных", error);
        setError("Ошибка загрузки данных");
      }
    };
    fetchTransactions();
  }, []);

  // Обработка добавления новой транзакции
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const newTransaction = {
        type,
        amount: parseFloat(amount),
        description,
        date,
      };
      const response = await axios.post('http://localhost:5000/api/transactions', newTransaction, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions([...transactions, response.data]);
      setAmount('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error("Ошибка добавления транзакции", error);
      setError("Ошибка добавления транзакции");
    }
  };

  // Обработка выхода из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Подсчет сумм доходов и расходов для диаграммы
  const incomeTotal = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenseTotal = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const data = {
    labels: ['Доходы', 'Расходы'],
    datasets: [
      {
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['#4CAF50', '#FF6384'],
        hoverBackgroundColor: ['#66bb6a', '#ff8a80'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Личный кабинет</h2>
      
      <button onClick={handleLogout} className="logout-button">Выйти</button>

      <form onSubmit={handleAddTransaction} className="transaction-form">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
        <input
          type="number"
          placeholder="Сумма"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Добавить</button>
      </form>

      {error && <p className="error">{error}</p>}

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Описание</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.type === 'income' ? 'Доход' : 'Расход'}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="chart-container">
        <h3>Процентное соотношение доходов и расходов</h3>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
