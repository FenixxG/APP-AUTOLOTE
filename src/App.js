import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import RecuperarContrasena from './components/Login/RecuperarContrasena';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
      </Routes>
    </Router>
  );
}

export default App;
