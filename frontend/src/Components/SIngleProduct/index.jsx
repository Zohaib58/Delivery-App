import React, { useState, useEffect, useContext } from 'react';
import { GetAProduct } from '../../util/ProductAPIs';
import { CartContext } from '../../context/cartContext';
import './SingleProduct.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SingleProduct = ({ id, Price }) => {
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      quantity: quantity, 
      price: Price * quantity,
    };
    addToCart(cartItem);
    setOpenSnackbar(true);
  };

  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const reset = () => {
    setProduct(null);
    setShowDialog(false);
    setShowFullDescription(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            <p>{product ? product.vendor : 'Loading vendor name...'}</p>
            <p>Price: {product ? Price : 'Loading product price...'}</p>
            <p>
              Description:{' '}
              {product ? (
                <>
                  {showFullDescription ? (
                    product.description
                  ) : (
                    <>
                      {product.description.slice(0, 100)}{' '}
                      <button onClick={toggleShowFullDescription}>See more</button>
                    </>
                  )}
                </>
                ) : (
                  'Loading product description...'
                )
              }
            </p>
            <p>
              Quantity:<input type='number' min='1' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
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
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ minWidth: 'auto' }}>
          Product added!
        </Alert>
        </Snackbar>
    </div>
  );
};

export default SingleProduct;
