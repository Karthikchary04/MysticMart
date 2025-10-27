import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;