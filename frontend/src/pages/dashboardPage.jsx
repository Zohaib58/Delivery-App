import {React, useState} from 'react';
import './dashboardPage.css';
import FilterSection from '../Components/FilterSection/FilterSection';
import SortSection from '../Components/SortSection/SortSection';
import ProductList from '../Components/ProductList/ProductList';
import { CategoryContext } from '../context/categoryContext';
import { CartProvider } from '../context/cartContext';

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('AllProduct$');

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    if (value === '') {
      setSearchKeyword('AllProduct$');
    } else {
      setSearchKeyword(value);
    }
  };

  const handleCheckout = () => {
    window.location.assign('/user/check-out')
  }

  return (
    <>
      <header className="header-container">
        <input type="text" className="search-bar" placeholder="Search using keywords..." onChange={handleInputChange}/>
        <button className="header-orders-button" onClick={()=>window.location.assign('/user/orders')}>My Orders</button>
        <button className='CheckOut' onClick={handleCheckout}>Check Out</button>
        <button className="header-logout-button">Log Out</button>
      </header>
      <div className="dashboardPage-container">
      <CategoryContext.Provider value={[selectedCategory, setSelectedCategory]}>
          <CartProvider>
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
                <ProductList searchKeyword={searchKeyword} />
                </div>
              </div>
          </CartProvider>
        </CategoryContext.Provider>
      </div>
    </>
  );
};

export default DashboardPage;
