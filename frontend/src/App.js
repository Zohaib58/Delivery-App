import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';

function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/orders" element={< Orders/>} />
                  <Route exact path="/products" element={< Products/>} />
                  <Route exact path="/locations" element={<div></div>} />
                  <Route exact path="/profile" element={<Account/>} />
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;