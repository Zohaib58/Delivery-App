import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import DashboardPage from '../pages/dashboardPage';
import CheckoutPage from '../pages/checkoutPage/checkoutPage';
import OrderDetails from '../pages/orderDetailsPage/orderDetail';
import { DisplayOrders } from '../pages/OrderPage/OrderPage';
import {UpdateUser} from '../pages/Profile';

function AppRoutes() {
    return (
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/user/profile" element={<UpdateUser/>}/>
          <Route path="/user/dashboard" element={<DashboardPage/>} />
          <Route path='/user/check-out' element={<CheckoutPage/>} />
          <Route path="/user/check-out/confirm-details" element={<OrderDetails/>} />
          <Route path="/user/orders" element={<DisplayOrders/>}/>
        </Routes>
    );
  }

export default AppRoutes
  
