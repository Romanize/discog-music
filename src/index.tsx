import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ModalContextProvider from './contexts/ModalContext';
import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
