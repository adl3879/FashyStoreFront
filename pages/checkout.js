import { useContext, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { usePaystackPayment } from "react-paystack";
import { Back, Cancel } from "../components/icons";
import states from "../lib/states";
import { gql, useMutation } from "@apollo/client";
import Spinner from "../components/spinner";
import { formatNumber } from "../helpers/utils";
import { CartContext } from "../contexts/cartContext";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import { RouteContext } from "../contexts/routeContext";
import { initializeApollo, addApolloState } from "../lib/apolloClient";
import Layout, { GET_PRODUCTS } from "../layout"

const ADD_ORDER = gql`
  mutation(
    $store_url: String!,
    $first_name: String!,
    $last_name: String!,
    $order_items: [OrderItemInput],
    $email: String!,
    $phone: String!,
    $shipping: ShippingInput
    $delivery_note: String,
    $total_price: Int!
  ) {
    addOrder(
      store_url: $store_url,
      first_name: $first_name,
      last_name: $last_name,
      order_items: $order_items,
      email: $email,
      phone: $phone,
      shipping: $shipping,
      delivery_note: $delivery_note,
      total_price: $total_price
    ) {
      _id
    }
  }
`;

const VERIFY_PAYMENT = gql`
  mutation($ref: String!, $order_id: ID!, $store_id: ID!) {
    verifyPayment(ref: $ref, order_id: $order_id, store_id: $store_id)
  }
`;

const Order = props => {
  let publicKey = "pk_test_77d74d3c0d3998d2a0baa55f86d6b97217627f09"

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    state: "",
    address: "",
    notes: ""
  }
  const router = useRouter();
  const [storeId, setStoreId] = useState("");
  const { cartItems, total, handleCheckout, handleError } = useContext(CartContext);
  const { pushRoute } = useContext(RouteContext);
  const [deliveryItems, setDeliveryItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const {values, handleChange, handleSubmit} = useForm({ 
    initialValues,
    onSubmit: _ => {
      addOrder();
    }
  });

  useEffect(() => {
    setStoreId(localStorage.getItem("store-id"));

    let items = localStorage.getItem("delivery");
    setDeliveryItems(JSON.parse(items))

    let price = deliveryItems.map(item => {
      if (values.location.length > 0 && values.location === item.address) {
        return item.price
      }
      return null;
    }).filter( item => item).join("");
    setDeliveryPrice(Number(price))

    let newOrder = [];
    cartItems.forEach(item => {
      newOrder.push({
        product_id: item._id,
        qty: Number(item.quantity) 
      })
    })
    setOrderItems(newOrder);
  }, [setDeliveryPrice, setOrderItems, cartItems, values])

  //verify payment
  const [verifyPayment, { loading: verifyLoading }] = useMutation(VERIFY_PAYMENT, {
    update() {
      handleCheckout();
      router.push("/all");
      pushRoute("home");
    },
    onError(_err) {
      handleError();
      router.push("/all");
      pushRoute("home");
    }
  })

  const onSuccess = response => {
    const orderId = localStorage.getItem("orderId");

    verifyPayment({
      variables: {
        ref: response.reference,
        store_id: storeId,
        order_id: orderId
      }
    })
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const config = {
    reference: (new Date()).getTime(),
    email: values.email,
    amount: (Number(total) + Number(deliveryPrice)) * 100, //total price
    metadata: {
      name: values.firstName + " " + values.lastName,
      phone: values.phone,
    },
    publicKey,
  }
  const initializePayment = usePaystackPayment(config);

  //submit form
  const [addOrder, { loading }] = useMutation(ADD_ORDER, {
    update(
      _,
      { data: { addOrder: orderData } }
    ) {
      localStorage.setItem("orderId", orderData._id)
      initializePayment(onSuccess, onClose);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      store_url: props.domain,
      first_name: values.firstName,
      last_name: values.lastName,
      order_items: orderItems,
      shipping: {
        state: values.state,
        delivery_location: values.location,
        delivery_addr: values.address,
        delivery_fee: Number(deliveryPrice)
      }, 
      email: values.email,
      phone: values.phone,
      delivery_note: values.notes.length ?  values.notes : "%empty%",
      total_price: Number(total) + Number(deliveryPrice)
    }
  });

  const handleCancel = e => {
    e.preventDefault();
    router.push("/all");
    pushRoute("home");
  }

  if (verifyLoading) return <div className="product-loading"><Loading /></div>;

  return(
    <Layout domain={props.domain}>
      <div className="modal__background">
        <div className="modal modal__cart modal__checkout">
          <div className="order-header">
            <div className="order-header-left" onClick={() => {
              router.push("/all");
              pushRoute("cart")
            }}>
              <Back />
              <h2>Cart</h2>
            </div>
            <h2>Order Information</h2>
            <Cancel onCancel={handleCancel} />
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form__half">
              <div className="form__group">
                <label htmlFor="first">First Name</label>
                <input 
                  type="text" 
                  placeholder="Your First Name" 
                  id="first" 
                  required 
                  name="firstName"
                  value={values.firstName} 
                  onChange={handleChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="last">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Your Last Name" 
                  id="last" 
                  required
                  name="lastName"  
                  value={values.lastName} 
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form__group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                id="email"
                required
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            <div className="form__group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                id="phone"
                required
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form__half">
              <div className="form__group">
                <label htmlFor="location">Delivery Location</label>
                <select id="location" onChange={handleChange} name="location" >
                  <option disabled selected>Select Location</option>
                  {
                    deliveryItems.map(item => (
                      <option key={item._id} value={item.address}>{item.address}</option>
                    ))
                  }
                </select>
              </div>

              <div className="form__group">
                <label htmlFor="state">State</label>
                <select id="state" onChange={handleChange} name="state">
                  <option value="0" disabled selected>Select State</option>
                  {
                    states.map((item, index) => (<option key={index} value={item}>{item}</option>))
                  }
                </select>
              </div>
            </div>

            <div className="form__group">
              <label htmlFor="add">Delivery Address</label>
              <input
                type="text"
                placeholder="Address"
                id="add"
                required
                name="address"
                value={values.address}
                onChange={handleChange}
              />
            </div>

            <div className="form__group">
              <label htmlFor="notes">Delivery Notes (optional)</label>
              <textarea
                placeholder="Notes"
                id="notes"
                name="notes"
                value={values.notes}
                onChange={handleChange}
              />
            </div>

            <div className="cart-bottom">
              <div className="cart-bottom-price">
                <h5>Items</h5>
                <h5>{formatNumber(total)}</h5>
              </div>

              <div className="cart-bottom-price">
                <h5>Delivery Fee</h5>
                <h5>{formatNumber(deliveryPrice)}</h5>
              </div>

              <div className="cart-bottom-price">
                <h5>Total</h5>
                <h5>{formatNumber(Number(total) + deliveryPrice)}</h5>
              </div>
            </div>

            <button className="form__button">
              <Spinner loading={loading}/>
              Pay Now
            </button>

          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ req }) => {
  const apolloClient = initializeApollo();
  const domain = req.headers.host.split(".")[0];

  await apolloClient.query({
    query: GET_PRODUCTS,
    variables: {
      store: domain
    },
  })

  return addApolloState(apolloClient, {
    props: {
      domain: domain
    },
  })
}

export default Order;