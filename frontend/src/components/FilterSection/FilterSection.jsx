import React, { useState, useEffect, useContext } from 'react';
import { GetAllCategories } from '../../data/CategoryApi';
import { CategoryContext } from '../../context/categoryContext';
import './FilterSection.css';

const FilterSection = () => {
  const [selectedCategory, setSelectedCategory] = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await GetAllCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error occurred while fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    localStorage.setItem('category', category);
    setSelectedButton(category)
  };

  return (
    <div className="filter-section">
      <h3>Filter</h3>
      <div className="dropdown">
        <ul className="category-list">
          <li key="Favourites" className="default">
            <button className={selectedButton === 'Favourites' ? 'selectedButton' : 'Favourites'} onClick={()=>handleCategoryClick("Favourites")}>Favourites</button>
          </li>
          <li key="All" className="default">
            <button className={selectedButton === '' || selectedButton === 'All' ? 'selectedButton' : 'All'} onClick={() => handleCategoryClick('All')}>
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.name} className="category-list-item">
              <button
                className={selectedButton === `${category.name}` ? 'selectedButton' : `${category.name}`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSection;
