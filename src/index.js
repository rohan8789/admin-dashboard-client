import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

import App from './App';
import { AuthProvider } from './shared/context/auth-context';

import './index.css';

let HelmetContext = {};
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider context={HelmetContext}>
      <AuthProvider>
        <App />
        <ToastContainer/>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


