/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cqcucouosyiruvzdbhzq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/signs/*",
      },
    ],
  },
}

export default nextConfig

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 's3.amazonaws.com',
//         port: '',
//         pathname: '/my-bucket/**',
//       },
//     ],
//   },
// }
