import {React, useState} from 'react';
import './dashboardPage.css';
import FilterSection from '../components/FilterSection/FilterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SortSection from '../components/SortSection/SortSection';
import ProductList from '../components/ProductList/ProductList.jsx';
import { CategoryContext } from '../context/categoryContext';
import { CartProvider } from '../context/cartContext';
import { SortingContext } from '../context/SortingContext';
import { LogoutFunc } from '../data/userApi';

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('AllProduct$');
  const [inputValue, setInputValue] = useState('');
  const [alphaSortCriteria, setAlphaSortCriteria] = useState('A - Z')
  const [priceSortCriteria, setPriceSortCriteria] =useState('Low - High')
  const [dropDown, setDropDown] = useState(false)

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

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  }

  const handleLogout = async() => {
    const res = await LogoutFunc();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.assign('/')
  }

  return (
    <>
      <header className="header-container">
        <input type="text" className="search-bar" placeholder="Search using keywords..." onChange={handleInputChange}/>
        <button className='search-button' onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
        <button className='CheckOut' onClick={handleCheckout}><FontAwesomeIcon icon={faShoppingCart} /></button>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
        Menu
        </button>
        </header>
      <div className="dashboardPage-container">
      {dropDown && (
              <div className='dropdown-list'>
                <button className='profile-button' onClick={()=>window.location.assign('/user/profile')}>Profile</button>
                <button className="orders-button" onClick={()=>window.location.assign('/user/orders')}>Orders</button>
                <button className='logout-button' onClick={handleLogout}>Logout</button>
              </div>
        )}
      <CategoryContext.Provider value={[selectedCategory, setSelectedCategory]}>
        <SortingContext.Provider value={[alphaSortCriteria, setAlphaSortCriteria, priceSortCriteria, setPriceSortCriteria]}>
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
