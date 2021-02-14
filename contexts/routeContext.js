import { createContext, useReducer } from 'react';
import { RouteReducer } from "./routeReducer";

export const RouteContext = createContext()

const initialState = {
  route: "home",
  product: ""
}

const RouteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RouteReducer, initialState);

  const pushRoute = payload => {
    dispatch({ type: "CHANGE_ROUTE", payload })
  }

  const appendProduct = payload => {
    dispatch({ type: "APPEND_PRODUCT", payload })
  }

  const returnHome = payload => {
    dispatch({ type: "UNDO_APPEND"});
  }

  const contextValues = {
    pushRoute,
    appendProduct,
    returnHome,
    ...state
  } 

  return ( 
    <RouteContext.Provider value={contextValues} >
      { children }
    </RouteContext.Provider>
  );
}
 
export default RouteContextProvider;