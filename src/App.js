import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChangePassword from './components/ChangePassword';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/change-password" element={<ChangePassword />} /> {/* Страница изменения пароля */}
      </Routes>
    </Router>
  );
}

export default App;
