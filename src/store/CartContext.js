import React, { useEffect, useState } from "react";

const CartContext = React.createContext({
  cartItems: [],
});

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (element) => element.id === item.id
    );
    const existingItem = cartItems[existingItemIndex];
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: +existingItem.amount + +item.amount,
      };
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex] = updatedItem;
      setCartItems(updatedItems);
    } else {
      const newItems = cartItems.concat(item);
      setCartItems(newItems);
    }
  };
  
  const plusAmountHandler = (id) => {
    const plusAmountItemIndex = cartItems.findIndex(
      (element) => element.id === id
    );
    const plusAmountItem = cartItems[plusAmountItemIndex];
    const updatedPlusAmountItem = {
      ...plusAmountItem,
      amount: +plusAmountItem.amount + 1,
    };
    const updatedCartItems = [...cartItems];
    updatedCartItems[plusAmountItemIndex] = updatedPlusAmountItem;
    setCartItems(updatedCartItems);
  };

  const minusAmountHandler = (id) => {
    const minusAmountItemIndex = cartItems.findIndex(
      (element) => element.id === id
    );
    const minusAmountItem = cartItems[minusAmountItemIndex];
    if (+minusAmountItem.amount === 1) {
      const filteredItems = cartItems.filter(
        (item) => item.id !== minusAmountItem.id
      );
      setCartItems(filteredItems);
      return;
    }
    const updatedminusAmountItem = {
      ...minusAmountItem,
      amount: +minusAmountItem.amount - 1,
    };
    const updatedCartItems = [...cartItems];
    updatedCartItems[minusAmountItemIndex] = updatedminusAmountItem;
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([])
  }

  useEffect(() => {
    const totalPriceEachItem = cartItems.map((item) => {
      return item.amount * item.price;
    });
    const totalPrice = totalPriceEachItem.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
    setTotal(totalPrice);
  }, [cartItems]);

  const context = {
    cartItems,
    addItem,
    total,
    plusAmountHandler,
    minusAmountHandler,
    clearCart
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContext;
