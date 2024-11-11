// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // Загрузка данных о транзакциях при загрузке компонента
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token'); // Получаем токен авторизации
        const response = await axios.get('/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Ошибка загрузки данных", error);
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
      await axios.post('/api/transactions', newTransaction, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions([...transactions, newTransaction]);
      setAmount('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error("Ошибка добавления транзакции", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Личный кабинет</h2>

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
    </div>
  );
};

export default Dashboard;
