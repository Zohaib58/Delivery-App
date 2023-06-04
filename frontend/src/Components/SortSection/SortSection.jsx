import React, { useContext, useState } from 'react';
import { SortingContext } from '../../context/SortingContext';
import './style.css';

const SortSection = () => {
  const [alphaSortCriteria, setAlphaSortCriteria] = useContext(SortingContext);
  const [priceSortCriteria, setPriceSortCriteria]= useContext(SortingContext);
  const [selectedAlphaButton, setSelectedAlphaButton] = useState(null);
  const [selectedPriceButton, setSelectedPriceButton] = useState(null);

  const handleAlphaSortCriteriaChange = (criteria) => {
    setAlphaSortCriteria(criteria);
    setSelectedAlphaButton(criteria);
  };

  const handlePriceSortCriteriaChange = (criteria) => {
    setPriceSortCriteria(criteria);
    setSelectedPriceButton(criteria);
  };

  return (
    <div className="sort-section">
      <button
        onClick={() => handleAlphaSortCriteriaChange('A - Z')}
        className={selectedAlphaButton === 'A - Z' ? 'alphaselected' : ''}
      >
        A-Z
      </button>
      <button
        onClick={() => handleAlphaSortCriteriaChange('Z - A')}
        className={selectedAlphaButton === 'Z - A' ? 'alphaselected' : ''}
      >
        Z-A
      </button>
      <button
        onClick={() => handlePriceSortCriteriaChange('High - Low')}
        className={selectedPriceButton === 'High - Low' ? 'pselected' : ''}
      >
        High - Low
      </button>
      <button
        onClick={() => handlePriceSortCriteriaChange('Low - High')}
        className={selectedPriceButton === 'Low - High' ? 'pselected' : ''}
      >
        Low - High
      </button>
    </div>
  );
};

export default SortSection;
