/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    // remotePatterns: [
    //   {
    //     // https://cqcucouosyiruvzdbhzq.supabase.co/storage/v1/object/public/signs/ee2e84df-6200-4afe-b49a-08be653b5a87.svg
    //     protocol: "https",
    //     hostname: "cqcucouosyiruvzdbhzq.supabase.co",
    //     port: "",
    //     // pathname: "/storage/v1/object/public/signs/**",
    //     pathname: "/storage/v1/object/signs/**",
    //   },
    // ],
    domains: ["cqcucouosyiruvzdbhzq.supabase.co"],
  },
  foo: "bar",
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
