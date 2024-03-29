import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Orders from '../pages/vendor/Orders';
import RegisterVendor from '../pages/SuperAdmin/VendorC';
import Category from '../pages/SuperAdmin/AddCategory';
import UpdateUser from '../pages/SuperAdmin/EditProfileUser';
import Products from '../pages/vendor/Products';
import CreateProduct from '../pages/vendor/Products/createProduct';
import Account from '../pages/vendor/Account';
import HomePage from '../pages/homePage';
import Dashboard from '../pages/vendor/Dashboard';
import DashboardPage from '../pages/dashboardPage';
import CheckoutPage from '../pages/checkoutPage/checkoutPage';
import OrderDetails from '../pages/orderDetailsPage/orderDetail';
import { DisplayOrders } from '../pages/OrderPage/OrderPage';
import AllVendors from '../pages/SuperAdmin/ShowAllVendors';
import {UpdateCustomer} from '../pages/Profile';

import SADashboard from '../pages/SuperAdmin/Dashboard';
import UpdateProduct from '../pages/vendor/Products/updateProduct';
function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<div></div>} />

      <Route exact path="/" element={<HomePage/>} />
      <Route exact path="/user/profile" element={<UpdateCustomer/>}/>
      <Route exact path="/user/dashboard" element={<DashboardPage/>} />
      <Route exact path='/user/check-out' element={<CheckoutPage/>} />
      <Route exact path="/user/check-out/confirm-details" element={<OrderDetails/>} />
      <Route exact path="/user/orders" element={<DisplayOrders/>}/>

      {/*Super Admin*/}
      <Route exact path="/sapi/dashboard" element={<SADashboard />} />
      <Route exact path="/sapi/addCategory" element={<Category />} />
      <Route exact path="/sapi/registerVendor" element={<RegisterVendor />} />
      <Route exact path="/sapi/ShowAllVendor" element={<AllVendors />} />

      
      {/*Vendor*/}
      <Route exact path="/vapi/dashboard" element={<Dashboard />} />
      <Route exact path="/vapi/orders" element={<Orders />} />
      <Route exact path="/vapi/products" element={<Products />}/>
      <Route exact path="/vapi/products/createProduct" element={<CreateProduct />} />
      <Route exact path="/vapi/products/updateProduct" element={<UpdateProduct />} />
      <Route exact path="/vapi/profile" element={<Account />} />


    </Routes>
  );
}

export default AppRoutes;