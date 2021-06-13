const Storage = cartItems => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cartItems.length > 0 ? cartItems: []));
  }
}

export const sumItems = cartItems => {
  Storage(cartItems);
  let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
  let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
  return { itemCount, total }
}

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find(item => item._id === action.payload._id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: action.qty
        })
      }

      return { 
        ...state,
        ...sumItems(state.cartItems),
        added: action.qty,
        cartItems: [...state.cartItems]
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(state.cartItems.filter(item => item._id !== action.payload._id)),
        cartItems: [...state.cartItems.filter(item => item._id !== action.payload._id)]
      }

    case "INCREASE":
      state.cartItems[state.cartItems.findIndex(item => item._id === action.payload._id)].quantity++
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      }
    
    case "DECREASE":
      state.cartItems[state.cartItems.findIndex(item => item._id === action.payload._id)].quantity--
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      }

    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      }
    
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      }

    case "REMOVE_ADDED":
      return {
        ...state,
        added: 0,
      }
    
    default:
      return state
  }
}