import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../Interceptors/Auth";
const api_url = "http://localhost:3000";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  // useEffect(() => {
  //   fetchCart();
  // }, []);

  // useEffect(() => {
  //   fetchCart();
  // }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get(api_url + "/cart");

      setCartCount(
        response.data.cart.reduce((acc, item) => acc + item.quantity, 0)
      );
      setCartItems(response.data.cart);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (bookId) => {
    try {
      await api.post(api_url + "/cart/add-book", { bookId });
      fetchCart();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      await api.delete(api_url + "/cart/remove-book", { data: { bookId } });
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const decrementFromCart = async (bookId) => {
    try {
      await api.patch(api_url + "/cart/decrement-book", { bookId });
      fetchCart();
    } catch (error) {
      console.error("Error decrementing item from cart:", error);
    }
  };

  const checkout = async () => {
    try {
      await api.patch(api_url + "/cart/check-out");
      fetchCart();
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        fetchCart,
        cartItems,
        totalPrice,
        addToCart,
        removeFromCart,
        decrementFromCart,
        checkout,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
