import { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './cartReducer';

export const CartContext = createContext()

const storage = (typeof window !== "undefined") && localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false, added: 0 };

const CartContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const increase = payload => {
    dispatch({type: 'INCREASE', payload})
  }

  const decrease = payload => {
    dispatch({type: 'DECREASE', payload})
  }

  const addProduct = (payload, qty) => {
    dispatch({type: 'ADD_ITEM', payload, qty})
  }

  const removeProduct = payload => {
    dispatch({type: 'REMOVE_ITEM', payload})
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR' })
  }

  const handleCheckout = () => {
    dispatch({ type: 'CHECKOUT' })
  }

  const removeAdded = () => {
    dispatch({ type: "REMOVE_ADDED" });
  }

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    removeAdded,
    ...state
  } 

  return ( 
    <CartContext.Provider value={contextValues} >
      { children }
    </CartContext.Provider>
  );
}
 
export default CartContextProvider;
