import React, { useEffect, useState, useContext } from 'react';
import { GetAllProducts } from '../../util/ProductAPIs';
import { CategoryContext } from '../../context/categoryContext';
import Product from './ProductCard';
import './ProductList.css';
import SingleProduct from '../SIngleProduct';
import { SortingContext } from '../../context/SortingContext';

const ProductList = ({searchKeyword}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ selectedCategory ] = useContext(CategoryContext);
  const [sortCriteria] = useContext(SortingContext)
  const [toggleProp, setToggleProp] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetAllProducts({ category: selectedCategory, keyword:searchKeyword });
        const data = res.data;
        if(sortCriteria === "A - Z"){
          data.sort((a,b)=>a.name.localeCompare(b.name))
        }
        else if(sortCriteria === "Z - A"){
          data.sort((a,b)=>b.name.localeCompare(a.name))
        }
        else if(sortCriteria === "High - Low"){
          data.sort((a,b)=>b.price-a.price)
        }
        else{
          data.sort((a,b)=>a.price-b.price)
        }
        setProducts(data);
      } catch (error) {
        console.log('Error occurred while fetching data:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchKeyword, sortCriteria]); 

  return (
    <div className="product-list">
      {
        products.map((curProduct) => {
          return <Product key={curProduct._id} curProduct={curProduct} onClick={() => setSelectedProduct(curProduct)}/>;
        })
      }
      {selectedProduct && (
        <SingleProduct id={selectedProduct._id} Price={selectedProduct.price} Switch={toggleProp}/>
      )}
    </div>
  );
};

export default ProductList;