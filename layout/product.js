import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import Counter from "../components/counter";
import { Cancel } from "../components/icons";
import Loading from "../components/loading";
import { CartContext } from "../contexts/cartContext";
import { RouteContext } from "../contexts/routeContext";
import { CFL, cn, formatNumber } from "../helpers/utils";

const GET_PRODUCT = gql`
  query ($id: ID!) {
    product(id: $id) {
      _id
      name
      description
      price
      image_url
      qty_left
      total_qty
    }
  }
`;

const LimitedPopup = (_) => {
  const [open, setOpen] = useState(true);
  setTimeout(() => {
    setOpen(false);
  }, 2000);

  return (
    <>
      {open && (
        <div
          className="popup"
          style={{ backgroundColor: "#ff0033", opacity: 0.65 }}
        >
          <p>Limited Item Available</p>
        </div>
      )}
    </>
  );
};

const Product = ({ isOpen }) => {
  const [qty, setQty] = useState(0);
  const [click, setClick] = useState(false);
  const { product, returnHome, pushRoute } = useContext(RouteContext);
  const [id, setId] = useState("");

  const { addProduct, cartItems, removeProduct } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item._id === product._id);
  };

  useEffect(() => {
    if (product && product.length > 0) {
      setId(product);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get("product");
      setId(myParam);
    }
  });

  const getQuantity = (product) => {
    if (isInCart(product))
      return cartItems.find((item) => item._id === product._id).quantity;
    else return null;
  };

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  if (loading)
    return (
      <div className="product-loading">
        <Loading />
      </div>
    );
  if (error) return `Error ${error}`;

  const handleCancel = (e) => {
    e.preventDefault();
    returnHome();
    pushRoute("home");
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (isInCart(data.product)) removeProduct(data.product);
    addProduct(data.product, Number(qty));
    pushRoute("home");
    returnHome();
  };

  return (
    <div className="modal__background">
      <div className="modal modal__center modal__product">
        <div className="product-head">
          <h2>{data && CFL(data.product.name)}</h2>
          <Cancel onCancel={handleCancel} />
        </div>

        <h5>{data && formatNumber(data.product.price)}</h5>
        <div className="product-image">
          <img src={data && data.product.image_url} alt="product" />
        </div>

        <div className="product-content">
          <h5>Quantity</h5>
          <Counter
            onCount={(count) => setQty(count)}
            qtyLeft={data.product.qty_left}
            totalQty={data.product.total_qty}
            initialCount={!click ? getQuantity(data.product) : null}
            onCounterClick={() => setClick(true)}
          />
        </div>

        <div className="product-content">
          <h5>Description</h5>
          <p>{data && CFL(data.product.description)}</p>
        </div>
        <button
          className={cn("product-btn", { "product-btn-inactive": !qty })}
          onClick={handleClick}
          disabled={!qty}
        >
          Add to Cart
        </button>

        {qty === data.product.qty_left && <LimitedPopup />}
      </div>
    </div>
  );
};

export default Product;
