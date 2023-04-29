import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import DashboardPage from '../pages/dashboardPage';
import CheckoutPage from '../pages/checkoutPage/checkoutPage';

function AppRoutes() {
    return (
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/user/dashboard" element={<DashboardPage/>} />
          <Route path='/user/check-out' element={<CheckoutPage/>} />
        </Routes>
    );
  }

export default AppRoutes
  
