import React, { useState, useEffect, useContext } from 'react';
import { GetAProduct } from '../../util/ProductAPIs';
import { CartContext } from '../../context/cartContext';
import './SingleProduct.css';

const SingleProduct = ({ id, Price }) => {
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [quantity, setQuantity] = useState(1); // New state for quantity

  useEffect(() => {
    setShowDialog(true);
    const fetchProduct = async () => {
      try {
        const res = await GetAProduct({ productID: id });
        const data = res.data;
        setProduct(data);
      } catch (error) {
        console.log('Error occurred while fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: quantity, // Adding quantity to cart item object
      price: Price * quantity, // Adding totalPrice to cart item object
    };
    addToCart(cartItem);
  };

  const reset = () => {
    setProduct(null);
    setShowDialog(false);
  };

  return (
    <div>
      {showDialog && (
        <div className='product-dialog'>
          <div className='product-image'>
            {product ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <p>Loading product image...</p>
            )}
          </div>
          <div className='product-details'>
            <h1>{product ? product.name : 'Loading product name...'}</h1>
            <p>Price: {product ? Price : 'Loading product price...'}</p>
            <p>About: {product ? product.description : 'Loading product description...'}</p>
            <p>
              Quantity:
              <input
                type='number'
                min='1'
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
          <button
            className='close-button'
            onClick={() => {
              handleCloseDialog();
              reset();
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
