import Head from "next/head";

const SEO = ({ store }) => {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/fashy_logo.png" />

      <title>{store.name} | Fashy Store</title>
      <meta name="title" content={`${store.name} | Fashy Store`} />
      <meta name="description" content={store.description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://${store.url}.fashy.shop/`} />
      <meta property="og:title" content={`${store.name} | Fashy Store`} />
      <meta property="og:description" content={store.description} />
      <meta property="og:image" content={store.products[0].image_url} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content={store.products[0].image_url} />
      <meta property="twitter:url" content={`https://${store.url}.fashy.shop/`} />
      <meta property="twitter:title" content={`${store.name} | Fashy Store`} />
      <meta property="twitter:description" content={store.description} />
      <meta property="twitter:image" content={store.products[0].image_url} />
    </Head>
  )
}

export default SEO;