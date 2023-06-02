import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';

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

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {cartItems.map((item, index) => (
          <div key={item.id} style={{ display: 'flex', margin: '10px' }}>
            <div style={{ flex: '1' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '100px' }}/>
            </div>
            <div style={{ flex: '3' }}>
              <h3>{item.name}</h3>
              <p>
                Quantity:{' '}
                <input type="number" defaultValue={quantityArray[index]} min={1} onChange={(e) => handleQuantityChange(e, index)} style={{ width: '50px' }}/>
              </p>
            </div>
            <div style={{ flex: '1' }}>
              <p>Price: PKR {(item.price * quantityArray[index])}</p>
            </div>
            <div>
              <button onClick={()=>handleRemoveItem(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Total Price: PKR {getTotalPrice()}</h3>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
      
    </div>
  );
};

export default CheckoutPage;
