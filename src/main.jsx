import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './assets/styles/reset.css';
import './assets/styles/index.css';
import logo from './assets/images/logo.svg';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <header>
      <img src={logo} alt="Alura Logo" />
    </header>
    <App />
  </React.StrictMode>,
);
