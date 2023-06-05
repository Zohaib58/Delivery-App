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

function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<div></div>} />

      <Route exact path="/" element={<HomePage />} />

      {/*Super Admin*/}
      <Route exact path="/sapi/addCategory" element={<Category />} />
      <Route exact path="/sapi/registerVendor" element={<RegisterVendor />} />

      
      {/*Vendor*/}
      <Route exact path="/vapi/dashboard" element={<Dashboard />} />
      <Route exact path="/vapi/orders" element={<Orders />} />
      <Route exact path="/vapi/products" element={<Products />}/>
      <Route exact path="/vapi/products/createProduct" element={<CreateProduct />} />
      <Route exact path="/vapi/profile" element={<Account />} />


    </Routes>
  );
}

export default AppRoutes;