import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';

const CheckoutPage = () => {
  const { cartItems, updateCart } = useContext(CartContext);

  const [quantityArray, setQuantityArray] = useState(
    cartItems.map((item) => item.quantity)
  );

  const handleQuantityChange = (e, index) => {
    const updatedQuantityArray = [...quantityArray];
    updatedQuantityArray[index] = parseInt(e.target.value);
    setQuantityArray(updatedQuantityArray);
  
    // Update the cart item in the cartItems array
    updateCart({ index, quantity: updatedQuantityArray[index] });
  };
  

  const handleConfirmOrder = () => {
    // Implement your logic for confirming the order here
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
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            <div style={{ flex: '3' }}>
              <h3>{item.name}</h3>
              <p>
                Quantity:{' '}
                <input
                  type="number"
                  value={quantityArray[index]}
                  onChange={(e) => handleQuantityChange(e, index)}
                  style={{ width: '50px' }}
                  min={1}
                />
              </p>
            </div>
            <div style={{ flex: '1' }}>
              <p>Price: PKR {item.price * quantityArray[index]}</p>
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
