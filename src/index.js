import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App"
import Settings from "./pages/Settings"
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/sent-presenter" element={<App></App>}/>
      <Route path = "/sent-presenter/settings" element={<Settings/>}/>
    </Routes>
  </BrowserRouter>
);
