import React, { useEffect, useState, useContext } from 'react';
import { GetAllProducts, GetFav } from '../../data/ProductAPIs';
import { CategoryContext } from '../../context/categoryContext';
import Product from './ProductCard';
import './ProductList.css';
import SingleProduct from '../SIngleProduct';
import { SortingContext } from '../../context/SortingContext';

const ProductList = ({searchKeyword}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ selectedCategory ] = useContext(CategoryContext);
  const [alphaSortCriteria, priceSortCriteria] = useContext(SortingContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if(selectedCategory === "Favourites"){
          const res = await GetFav({keyword: searchKeyword});
          const data = res.data;
          if (alphaSortCriteria === "A - Z") {
            data.sort((a,b)=>a.name.localeCompare(b.name))
          }
          else{
            data.sort((a,b)=>b.name.localeCompare(a.name))
          }
          if (priceSortCriteria === "High - Low") {
            data.sort((a,b)=>b.price-a.price)
          }
          else {
            data.sort((a,b)=>a.price-b.price)
          }
          setProducts(data);
        }
        else{
          const res = await GetAllProducts({ category: selectedCategory, keyword:searchKeyword });
          const data = res.data;
          console.log(data)
          if (alphaSortCriteria === "A - Z") {
            data.sort(function(a, b){
              var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
              if (nameA < nameB)
               return -1;
              if (nameA > nameB)
               return 1;
              console.log("reached")
              return 0;
             });
            console.log(data)
          }
          else{
            data.sort((a,b)=>b.name.localeCompare(a.name))
          }
          if (priceSortCriteria === "High - Low") {
            data.sort((a,b)=>b.price-a.price)
          }
          else {
            data.sort((a,b)=>a.price-b.price)
          }
          setProducts(data);
        }
      } catch (error) {
        console.log('Error occurred while fetching data:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchKeyword, alphaSortCriteria, priceSortCriteria]); 

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