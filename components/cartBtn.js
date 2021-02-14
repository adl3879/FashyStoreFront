import { Cart } from "./icons";
import { RouteContext } from "../contexts/routeContext";
import { CartContext } from "../contexts/cartContext";
import { useContext, useEffect, useState } from "react";

const CartBtn = () => {
  const { pushRoute } = useContext(RouteContext);
  const { itemCount } = useContext(CartContext);
  const [count, setCount] = useState(null);
  
  useEffect(() => {
    setCount(itemCount);
  })

  const handleClick = e => {
    e.preventDefault();
    pushRoute("cart");
  }

  return(
    <div className="cart-btn">
      <button onClick={handleClick} data-badge={count > 0 ? count : null}>
        <Cart />
      </button>
    </div>
  );
}

export default CartBtn;