import React, { useState, useEffect, useContext } from 'react';
import { GetAllCategories } from '../../util/CategoryApi';
import { CategoryContext } from '../../context/categoryContext';
import './FilterSection.css';

const FilterSection = () => {
  const [selectedCategory, setSelectedCategory] = useContext(CategoryContext);
  localStorage.setItem('category', selectedCategory);
  const [categories, setCategories] = useState([]);

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
  };

  return (
    <div>
      <h2>Category Available</h2>
      <ul className="category-list">
        <li key= "All" className='default'>
          <button onClick={()=> handleCategoryClick("All")}
          className={`category-link ${selectedCategory === "All" ? 'active' : ''}`}>
            All
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.name} className="category-list-item">
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`category-link ${selectedCategory === category.name ? 'active' : ''}`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
