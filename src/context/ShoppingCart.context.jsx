import { createContext, useContext, useMemo, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const amountOfItems = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const addProductToCart = (product) => {
    if (cartItems.some((item) => item.product.id === product.id)) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return setCartItems(updatedCartItems);
    }
    const cartItem = { product, quantity: 1 };
    setCartItems([...cartItems, cartItem]);
  };
  const deleteProductFromCart = (product) => {
    const filteredItems = cartItems.filter(
      (item) => item.product.id !== product.id
    );
    setCartItems(filteredItems);
  };
  const addProductQuantity = (product) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeProductQuantity = (product) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    const filteredItems = updatedCartItems.filter((item) => item.quantity > 0);
    setCartItems(filteredItems);
  };

  const shoppingCartTotal = cartItems.reduce((acc, item) => {
    return acc + item.product.currentUnitPrice * item.quantity;
  }, 0);

  const resetCart = () => {
    setCartItems([]);
  };

  const value = useMemo(() => {
    return {
      cartItems,
      amountOfItems,
      shoppingCartTotal,
      setCartItems,
      addProductToCart,
      deleteProductFromCart,
      addProductQuantity,
      removeProductQuantity,
      resetCart,
    };
  }, [
    cartItems,
    amountOfItems,
    shoppingCartTotal,
    setCartItems,
    addProductToCart,
    deleteProductFromCart,
    addProductQuantity,
    removeProductQuantity,
    resetCart,
  ]);

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
