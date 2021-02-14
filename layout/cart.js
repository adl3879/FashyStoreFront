import Counter from "../components/counter"
import { useRouter } from "next/router";
import { useContext } from "react";
import { CFL, formatNumber } from "../helpers/utils";
import { CartContext } from "../contexts/cartContext";
import { Cancel, Delete } from "../components/icons";
import { RouteContext } from "../contexts/routeContext";

const Cart = () => {
  const router = useRouter();
  const { cartItems, increase, decrease, removeProduct, total } = useContext(CartContext);
  const { pushRoute } = useContext(RouteContext);

  const handleCancel = e => {
    e.preventDefault();
    pushRoute("home");
  }

  const handleSubmit = e => {
    e.preventDefault();
    router.push("/checkout")
  }

  const handleCounterClick = (type, product) => {
    if (type === "add")
      increase(product);
    else if (type === "remove")
      decrease(product);
  }

  if (!cartItems.length) return (
    <div className="modal__background">
      <div className="modal modal__cart">
        <div className="cart-header">
          <h2>Cart</h2>
          <Cancel onCancel={handleCancel} />
        </div>
        <p className="empty">Your cart is empty...</p>
      </div>
    </div>
  )

  return(
    <div className="modal__background">
      <div className="modal modal__cart">
        <div className="cart-header">
          <h2>Cart</h2>
          <Cancel onCancel={handleCancel} />
        </div>

        {
          cartItems.map(product => (
            <div className="cart-items cart-items--mb">
              <div className="cart-img">
                <img src={product.image_url} alt={product.name}/>
              </div>
              
              <div className="cart-items-middle">
                <div className="cart-items-name">
                  <h3>{CFL(product.name)}</h3>
                  <h5>{formatNumber(product.price)}</h5>
                </div>
                <Counter onCounterClick={(type) => handleCounterClick(type, product)} qty={product.quantity} qtyLeft={product.qty_left}/>
              </div>
              <Delete onDelete={() => removeProduct(product)} />
            </div>
          ))
        }

        {
          cartItems.map(product => (
            <div className="cart-items" key={product.name}>
              <div className="cart-img">
                <img src={product.image_url} alt={product.name}/>
              </div>

              <div className="cart-items-name">
                <h3>{CFL(product.name)}</h3>
                <h5>{formatNumber(product.price)}</h5>
              </div>
              <Counter onCounterClick={(type) => handleCounterClick(type, product)} qty={product.quantity} qtyLeft={product.qty_left}/>
              <Delete onDelete={() => removeProduct(product)} />
            </div>
          ))
        }

        <div className="cart-line"></div>

        <div className="cart-bottom">
          <div className="cart-bottom-price">
            <h5>Items</h5>
            <h5>{formatNumber(total)}</h5>
          </div>
        </div>

        <button className="cart-btn2" onClick={handleSubmit}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart;