import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Content from './pages/Content';
import Teleprompter from './pages/Teleprompter';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route index element={<Content />} />
          <Route path="/teleprompter" element={<Teleprompter />} /> 
      </Routes>
    </BrowserRouter>    
  </React.StrictMode>
);