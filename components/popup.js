import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/cartContext";
import { RouteContext } from "../contexts/routeContext";

const Popup = props => {
	const { removeAdded } = useContext(CartContext);
	const { pushRoute } = useContext(RouteContext);

	useEffect(() => {
		setTimeout(() => {
			removeAdded();
		}, 4000);
	})

	const handleClick = e => {
		e.preventDefault();
		pushRoute("cart");
		removeAdded();				
	}

	return (
		<div className="popup">
			<p>{props.qty} item(s) added to your cart</p>
			<button onClick={handleClick}>View</button>
		</div>
	)
}

export default Popup;