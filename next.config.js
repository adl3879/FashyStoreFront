const { redirect } = require("next/dist/next-server/server/api-utils");

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/all",
        permanent: true,
      },
    ]
  }
}