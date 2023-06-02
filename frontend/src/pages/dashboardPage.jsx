import {React, useState} from 'react';
import './dashboardPage.css';
import FilterSection from '../Components/FilterSection/FilterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SortSection from '../Components/SortSection/SortSection';
import ProductList from '../Components/ProductList/ProductList.jsx';
import { CategoryContext } from '../context/categoryContext';
import { CartProvider } from '../context/cartContext';
import { SortingContext } from '../context/SortingContext';

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('AllProduct$');
  const [inputValue, setInputValue] = useState('');
  const [sortCriteria, setSortCriteria] = useState([])

  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim())
  };

  const handleSearch = ()=> {
    if (inputValue === '') {
      setSearchKeyword('AllProduct$');
    } else {
      setSearchKeyword(inputValue);
    }
  }

  const handleCheckout = () => {
    window.location.assign('/user/check-out')
  }

  return (
    <>
      <header className="header-container">
        <input type="text" className="search-bar" placeholder="Search using keywords..." onChange={handleInputChange}/>
        <button className='search-button' onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
        <button className="header-orders-button" onClick={()=>window.location.assign('/user/orders')}>My Orders</button>
        <button className='CheckOut' onClick={handleCheckout}><FontAwesomeIcon icon={faShoppingCart} /></button>
        <button className="header-logout-button">Log Out</button>
      </header>
      <div className="dashboardPage-container">
      <CategoryContext.Provider value={[selectedCategory, setSelectedCategory]}>
        <SortingContext.Provider value={[sortCriteria, setSortCriteria]}>
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
          </SortingContext.Provider>
        </CategoryContext.Provider>
      </div>
    </>
  );
};

export default DashboardPage;
