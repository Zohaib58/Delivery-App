import React, { useEffect, useState, useContext } from 'react';
import { GetAllProducts } from '../../util/ProductAPIs';
import { CategoryContext } from '../../context/categoryContext';
import Product from './ProductCard';
import './ProductList.css';
import SingleProduct from '../SIngleProduct';

const ProductList = ({searchKeyword}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ selectedCategory ] = useContext(CategoryContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetAllProducts({ category: selectedCategory, keyword:searchKeyword });
        const data = res.data;
        setProducts(data);
      } catch (error) {
        console.log('Error occurred while fetching data:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchKeyword]); 

  return (
    <div className="product-list">
      {
        
        products.map((curProduct) => {
          return <Product key={curProduct._id} curProduct={curProduct} onClick={() => setSelectedProduct(curProduct)}/>;
        })
      }
      {selectedProduct && (
        <SingleProduct id={selectedProduct._id} Price={selectedProduct.price}/>
      )}
    </div>
  );
};

export default ProductList;