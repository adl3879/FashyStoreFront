import CartContextProvider from '../contexts/cartContext';
import RouteContextProvider from "../contexts/routeContext";
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../lib/apolloClient";
import "../scss/main.css";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps);
  
  return (
    <ApolloProvider client={client}>
      <RouteContextProvider>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </RouteContextProvider>
    </ApolloProvider>
  )
}

export default MyApp;