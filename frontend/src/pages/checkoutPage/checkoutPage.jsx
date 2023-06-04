import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { LogoutFunc } from '../../data/userApi';
import './style.css';

const CheckoutPage = () => {
  const { cartItems, updateCart, removeItem } = useContext(CartContext);

  const [quantityArray, setQuantityArray] = useState(
    cartItems.map((item) => item.quantity)
  );

  useEffect(() => {
    setQuantityArray(cartItems.map((item) => item.quantity));
  }, [cartItems]);

  const handleQuantityChange = (e, index) => {
    const updatedQuantityArray = [...quantityArray];
    const quantity = parseInt(e.target.value);
    if (quantity <= 0) {
      e.target.value = 1;
      updatedQuantityArray[index] = 1;
      setQuantityArray(updatedQuantityArray);
    } else {
      updatedQuantityArray[index] = parseInt(e.target.value);
      setQuantityArray(updatedQuantityArray);
    }
    updateCart({ index, quantity: updatedQuantityArray[index] });
  };

  const handleConfirmOrder = () => {
    window.location.assign('/user/check-out/confirm-details');
  };

  const handleRemoveItem = (index) => {
    removeItem({ index: index });
    const updatedQuantityArray = [...quantityArray];
    updatedQuantityArray.splice(index, 1);
    setQuantityArray(updatedQuantityArray);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].price * quantityArray[i];
    }
    return totalPrice;
  };

  const handleLogout = async() => {
    const res = await LogoutFunc();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.assign('/')
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header-container">
        <button className="home-button" onClick={() => window.location.assign('/user/dashboard')}>Dashboard</button>
        <h3 className='heading-checkout'>CHECKOUT</h3>
        <button className="checkout-orders-button" onClick={() => window.location.assign('/user/orders')}>Orders</button>
        <button className="checkout-logout-button" onClick={handleLogout}>Log Out</button>
      </header>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>
                Quantity:{' '}
                <input type="number" defaultValue={quantityArray[index]} min={1} onChange={(e) => handleQuantityChange(e, index)} />
              </p>
              <p>Price: PKR {(item.price * quantityArray[index])}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleRemoveItem(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h3>Total Price: PKR {getTotalPrice()}</h3>
        <button classname='Confirm-button' onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
