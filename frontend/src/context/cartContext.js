import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const printCart = () => {
    console.log(cartItems)
  }

  const addToCart = (product) => {
    let prev_index=-1 ;
    for(let i = 0; i<cartItems.length; i++){
      if(cartItems[i]._id === product._id){
        prev_index= i;
      }
    }
    if(prev_index>-1){
      cartItems[prev_index].quantity += product.quantity;
      setCartItems([...cartItems]);
    }
    else{
      setCartItems([...cartItems, product]);
    }
    
  };

  const updateCart = ({ index, quantity }) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCart, removeItem, clearCart, printCart
     }}>
      {children}
    </CartContext.Provider>
  );
};
