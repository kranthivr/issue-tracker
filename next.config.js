/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do the following if avatar image is giving 403 or error
  //   async headers() {
  //     return [
  //       {
  //         source: "/:path*",
  //         headers: [{ key: "referrer-policy", value: "no-referrer" }],
  //       },
  //     ];
  //   },
};

module.exports = nextConfig;
