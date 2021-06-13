import Head from "next/head";

const SEO = ({ store }) => {
  const name = store.name;
  const logo = store.logo_url;
  const description = store.description;
  const api = "https://i.microlink.io/";
  const cardUrl = `https://cards.microlink.io/?preset=jxnblk&logo=${logo}&p=2gXDPD4KICA8TGluawogICAgaHJlZj0iaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Xb3JrK1NhbnM6aXRhbCx3Z2h0QDAsNDAwOzAsNTAwOzAsNjAwOzEsNDAwOzEsNTAwOzEsNjAwJmRpc3BsYXk9c3dhcCIKICAgIHJlbD0ic3R5bGVzaGVldCIKICAvPgogIDxGbGV4CiAgICBzeD17ewogICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJywKICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLAogICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywKICAgICAgYmc6ICAid2hpdGUiLAogICAgICBweDogNSwKICAgIH19CiAgPgogICAgPEJveCBzeD17ewogICAgICB3aWR0aDogJzEwMHB4JywKICAgICAgaGVpZ2h0OiAnMTAwcHgnLAogICAgICBwb3NpdGlvbjogInJlbGF0aXZlIiwKICAgICAgbWFyZ2luQm90dG9tOiAiMTBweCIKICAgIH19PgogICAgICA8SW1hZ2UgCiAgICAgICAgc3g9e3sgCiAgICAgICAgICB3aWR0aDogIjEwMCUiLAogICAgICAgICAgaGVpZ2h0OiAiMTAwJSIsCiAgICAgICAgICBib3JkZXJSYWRpdXM6ICI1MCUiLAogICAgICAgICAgcG9zaXRpb246ICJhYnNvbHV0ZSIsCiAgICAgICAgfX0gCiAgICAgICAgc3JjPXtxdWVyeS5sb2dvfSAvPgogICAgPC9Cb3g-CiAgICA8VGV4dAogICAgICBzeD17ewogICAgICAgIHBhZGRpbmc6ICI4cHggMCIsCiAgICAgICAgdGV4dFRyYW5zZm9ybTogJ2NhcGl0YWxpemUnLAogICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjJlbScsCiAgICAgICAgbGluZUhlaWdodDogMS4yNSwKICAgICAgICBmb250RmFtaWx5OiAnV29yayBTYW5zJywKICAgICAgICBmb250V2VpZ2h0OiA2MDAsCiAgICAgICAgZm9udFNpemU6IDQsCiAgICAgICAgY29sb3I6ICIjMTUxNTIyIgogICAgICB9fQogICAgPgogICAgICB7cXVlcnkubmFtZX0KICAgIDwvVGV4dD4KICAgIDxUZXh0CiAgICAgIHN4PXt7CiAgICAgICAgZm9udFdlaWdodDogNTAwLAogICAgICAgIGZvbnRTaXplOiAiMi41IiwKICAgICAgICBmb250RmFtaWx5OiAnV29yayBTYW5zJywKICAgICAgICB0ZXh0QWxpZ246ICJjZW50ZXIiLAogICAgICAgIHdpZHRoOiAiNzAlIiwKICAgICAgICBjb2xvcjogIiM3ODc2NzYiCiAgICAgIH19CiAgICA-CiAgICAgIHtxdWVyeS5kZXNjcmlwdGlvbn0KICAgIDwvVGV4dD4KCiAgICA8RmxleCBzeD17e21hcmdpblRvcDogIjcwcHgifX0-CiAgICAgIDxJbWFnZSBzeD17e3dpZHRoOiAyNSwgbWFyZ2luOiAiMCAxMHB4In19IHNyYz0iaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vd3d3LWZhc2h5LXNob3AvaW1hZ2UvdXBsb2FkL3YxNjEyODE1Mzc0L0xvZ29fcmRiZ2tnLnBuZyIgYWx0PSJsb2dvIiAvPgogICAgICA8VGV4dCBjeD17ewogICAgICAgIGZvbnRGYW1pbHk6ICJXb3JrIFNhbnMiLAogICAgICAgIGZvbnRXZWlnaHQ6ICI1MDAiCiAgICAgIH19Pk1hZGUgSW4gRmFzaHk8L1RleHQ-CiAgICA8L0ZsZXg-CiAgPC9GbGV4Pgo8Lz4&fashy=Made+in+Fashy&description=${description}&name=${name}`;
  const image = `${api}${encodeURIComponent(cardUrl)}`;

  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/fashy_logo.png" />

      <title>{store.name} | Fashy Store</title>
      <meta name="title" content={`${store.name} | Fashy Store`} />
      <meta name="description" content={`${store.name} online store / Order with Fashy`} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://${store.url}.fashy.store/`} />
      <meta property="og:title" content={`${store.name} | Fashy Store`} />
      <meta property="og:description" content={`${store.name} online store / Order with Fashy`} />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content={image} />
      <meta property="twitter:url" content={`https://${store.url}.fashy.store/`} />
      <meta property="twitter:title" content={`${store.name} | Fashy Store`} />
      <meta property="twitter:description" content={`${store.name} online store / Order with Fashy`} />
      <meta property="twitter:image" content={image} />
    </Head>
  )
}

export default SEO;