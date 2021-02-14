import Nav from "../components/nav";
import CartBtn from "../components/cartBtn";
import Footer from "../components/footer";
import Home from "./home";
import Loading from "../components/loading";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import SEO from "../components/head";
import NotFound from "./NotFound";

export const GET_PRODUCTS = gql`
  query($store: String!) {
    store(store: $store) {
      _id
      logo_url
      description
      user_id
      url
      name
      products {
        _id
        image_url
        name
        price
        total_qty
      }
      delivery {
        address
        price
      }
    }
  }
`;

const Layout = ({ children, domain }) => {
  const { loading, error, data, networkStatus } = useQuery(
    GET_PRODUCTS,
    {
      variables: {
        store: domain
      },
      
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  if (error) return <NotFound />;
  if (loading && loadingMorePosts) return <Loading />;

  if (typeof window !== "undefined") {
    localStorage.setItem("store-id", data.store._id);
    localStorage.setItem("user", data.store.user_id);
    localStorage.setItem("delivery", JSON.stringify(data.store.delivery));
  }

  return (
    <div className="layout">
      <SEO store={data.store} />

      <Nav store={data.store} />
      <CartBtn />
      <Home products={data.store.products} />
      { children }
      <Footer name={data.store.name} />
    </div>
  )
}

export default Layout;