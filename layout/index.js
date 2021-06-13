import Nav from "../components/nav";
import CartBtn from "../components/cartBtn";
import Footer from "../components/footer";
import Home from "./home";
import Loading from "../components/loading";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import SEO from "../components/head";
import NotFound from "./NotFound";

export const GET_PRODUCTS = gql`
  query ($page: Int, $limit: Int, $store_url: String!) {
    productsWithPagination(page: $page, limit: $limit, store_url: $store_url) {
      paginator {
        prev
        next
        currentPage
      }
      store {
        _id
        url
        user
        description
        logo_url
        name
        deliveries {
          address
          price
        }
      }
      products {
        _id
        image_url
        name
        price
        total_qty
      }
    }
  }
`;

const Layout = ({ children, domain }) => {
  const { loading, error, data, networkStatus } = useQuery(GET_PRODUCTS, {
    variables: {
      page: 1,
      limit: 10,
      store_url: domain,
    },

    notifyOnNetworkStatusChange: true,
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (error) return <NotFound />;
  if (loading && loadingMorePosts) return <Loading />;

  if (data) {
    if (typeof window !== "undefined") {
      localStorage.setItem("store-id", data.productsWithPagination.store._id);
      localStorage.setItem("user", data.productsWithPagination.store.user);
      localStorage.setItem(
        "deliveries",
        JSON.stringify(data.productsWithPagination.store.deliveries)
      );
    }

    return (
      <div className="layout">
        <SEO store={data.productsWithPagination.store} />

        <Nav store={data.productsWithPagination.store} />
        <CartBtn />
        <Home products={data.productsWithPagination.products} />
        {children}
        <Footer name={data.productsWithPagination.store.name} />
      </div>
    );
  }

  return <div>&nbsp;</div>;
};

export default Layout;
