export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ??
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  )
}
