import { CFL, formatNumber } from "../helpers/utils";
import { Empty } from "../components/icons";
import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import MsgModal from "../components/msgModal";
import { RouteContext } from "../contexts/routeContext";

const Home = props => { 
  const { checkout, error, added } = useContext(CartContext);
  const { pushRoute, appendProduct } = useContext(RouteContext);

  const handleClick = (e, id) => {
    e.preventDefault();
    pushRoute("product");
    appendProduct(id);
  }

  if (props.products && !props.products.length) {
    return (
      <div className="home__empty">
        <div className="home__empty--container">
          <Empty />
          <h2>Oh! It’s still empty</h2>
          <p>There is no product available yet!</p>
        </div>
      </div>
    )
  }

  return(
    <div className="home">
      {
        props.products && props.products.map(product => (
          <div className="home__card" key={product._id} onClick={e => handleClick(e, product._id)}>
            <div className="home__card--top">
              <img src={product.image_url} alt="ankara" />
            </div>
            <div className="home__card--bottom">
              <a>{CFL(product.name)}</a>
              <p>{formatNumber(product.price)}</p>
            </div>
          </div>
        ))
      }

      { checkout && <MsgModal success /> }
      { error && <MsgModal /> }
    </div>
  )
}

export default Home;