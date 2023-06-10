import React, { useState, useEffect, useContext } from 'react';
import { GetAProduct, getProductCount } from '../../data/ProductAPIs';
import { CartContext } from '../../context/cartContext';
import './SingleProduct.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


// Rest of your code...


const SingleProduct = ({ id, Price}) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(2);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setShowDialog(true);
    const fetchProduct = async () => {
      try {
        const res = await GetAProduct({ productID: id });
        const data = res.data;
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.log('Error occurred while fetching product data:', error);
      }
    };

    const getCount = async() => {
      try{
        const res = await getProductCount({productID: id});
        setMaxQuantity(res.data)
      } catch(err) {
        console.log("Error occurred while getting product count:", err)
      }
    }

    fetchProduct();
    getCount();

  }, [id]);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleAddToCart = () => {
    const cartitem = {
      ...product,
      quantity: quantity, 
      price: Price,
    };
    addToCart(cartitem);
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
            <p>Price: PKR {product ? Price : 'Loading product price...'}</p>
            <p>Size: {product ? product.size : 'Loading size...'}</p>

            <p>
              Description:{' '}
              {product ? (
                <>
                  {showFullDescription || product.description.length<=99 ? (
                    product.description
                  ) : (
                    <>
                      {product.description.slice(0, 100)}{' '}
                      <button className="des-button" onClick={toggleShowFullDescription}>See more...</button>
                    </>
                  )}
                </>
                ) : (
                  'Loading product description...'
                )
              }
            </p>
            <p>
              Quantity:<input type='number' min='1' max={maxQuantity} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
            </p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
          <button className='close-button' style={{ textAlign: 'right', marginLeft: 'auto' }} onClick={() => {
              handleCloseDialog();
              reset();
            }}>X</button>
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
