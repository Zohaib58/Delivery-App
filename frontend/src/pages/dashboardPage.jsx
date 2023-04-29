import {React, useState} from 'react';
import './dashboardPage.css';
import FilterSection from '../Components/FilterSection/FilterSection';
import SortSection from '../Components/SortSection/SortSection';
import ProductList from '../Components/ProductList/ProductList';
import { CategoryContext } from '../context/categoryContext';
import { CartProvider } from '../context/cartContext';

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  return (
    <>
      <header className="header-container">
        <input type="text" className="search-bar" placeholder="Search using keywords..." />
        <button className="header-orders-button">My Orders</button>
        <button className='CheckOut' onClick={()=>window.location.assign('/user/check-out')}>Check Out</button>
        <button className="header-logout-button">Log Out</button>
      </header>
      <div className="dashboardPage-container">
        <CartProvider>
      <CategoryContext.Provider value={[selectedCategory, setSelectedCategory]}>
        <div className="column1">
          <div>
            <FilterSection />
          </div>
        </div>
        <div className="column2">
          <div>
            <SortSection />
          </div>
          <div>
            <ProductList />
          </div>
        </div>
        </CategoryContext.Provider>
        </CartProvider>
      </div>
    </>
  );
};

export default DashboardPage;
