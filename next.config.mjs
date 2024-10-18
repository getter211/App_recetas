import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
});

export default withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/apirecetas-production.up.railway.app\/api\/recipes\/.*$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "recipes-api-cache",
          expiration: {
            maxEntries: 100,
          },
        },
      },
      {
        urlPattern: /^https:\/\/apirecetas-production.up.railway.app\/api\/recipes\/.*$/,
        handler: "CacheFirst",
        options: {
          cacheName: "static-assets-cache",
          expiration: {
            maxEntries: 50,
          },
        },
      },
    ],
  },
});
