import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarathonList from 'components/MarathonList';
import Register from 'components/Register';
import Login from 'components/Login';
import NotFound from 'components/NotFound';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarathonList />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
