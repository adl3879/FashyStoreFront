import { initializeApollo, addApolloState } from "../lib/apolloClient";
import Layout, { GET_PRODUCTS } from "../layout";
import { RouteContext } from "../contexts/routeContext";
import { useContext, useEffect, useState } from "react";
import Product from "../layout/product";
import Cart from "../layout/cart";
import Contact from "../layout/contact";
import { CartContext } from "../contexts/cartContext";
import Popup from "../components/popup";

const Home = ({ domain }) => {
  const { route } = useContext(RouteContext);
  const { added } = useContext(CartContext);
  const [isProduct, setIsProduct] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("product");
    if (myParam && myParam.length > 0) {
      setIsProduct(true);
    }
  });

  return (
    <div>
      <Layout domain={domain}>
        {route === "home" && !isProduct ? (
          <div>&nbsp;</div>
        ) : route === "product" &&
          isProduct &&
          route !== "cart" &&
          route !== "contact" ? (
          <Product />
        ) : route === "cart" ? (
          <Cart />
        ) : route === "contact" ? (
          <Contact />
        ) : null}

        {added > 0 && <Popup qty={added} />}
      </Layout>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const apolloClient = initializeApollo();
  const domain = req.headers.host.split(".")[0];

  await apolloClient.query({
    query: GET_PRODUCTS,
    variables: {
      page: 1,
      limit: 3,
      store_url: domain,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      domain: domain,
    },
  });
};

export default Home;
