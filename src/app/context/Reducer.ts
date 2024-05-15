"use client"
interface CartItem {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  price: string;
}

interface CartState {
  categories: any[];
  items: any[];
  cart: CartItem[];
}

type Action =
  | { type: "SET_CATEGORIES"; payload: any[] }
  | { type: "SET_ITEMS"; payload: any[] }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "INITIALIZE_CART"; payload: CartItem[] }


const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    
    case "ADD_TO_CART":
      
      const updatedCart = [...state.cart, action.payload];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
      
    case "REMOVE_FROM_CART":
      const filterCart = state.cart.filter((item) => item._id !== action.payload)
      localStorage.setItem("cart", JSON.stringify(filterCart));
      return { ...state, cart: filterCart };
    
    case "INITIALIZE_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export { cartReducer };
export type { CartState, Action };
