"use client"
import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from "react";
import { cartReducer, CartState, Action } from "./Reducer";
import { useSession } from "next-auth/react";

const initialState: CartState = { categories: [], items: [], cart: [] };

const CartContext = createContext<
  { state: CartState; dispatch: Dispatch<Action> } | undefined
>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const userId = session?.user?.email || ""; // Default to empty string if userId is undefined
  const cartKey = userId ? `cart_${userId}` : "";
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category"); 
        const data = await response.json();
        dispatch({ type: "SET_CATEGORIES", payload: data.category });
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch("/api/menu-items"); 
        const data = await response.json();
        dispatch({ type: "SET_ITEMS", payload: data.menu });
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };

    fetchCategories();
    fetchItems();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      dispatch({ type: "INITIALIZE_CART", payload: JSON.parse(storedCart) });
    }
  }, [cartKey]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(cartKey, JSON.stringify(state.cart));
    }
  }, [state.cart, cartKey, userId]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };