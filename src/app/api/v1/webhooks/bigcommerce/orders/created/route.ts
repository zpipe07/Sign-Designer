export async function POST(request: Request) {
  const body = await request.json()
  console.log(body)
  return Response.json({ body })
}

// /api/v1/webhooks/bigcommerce/orders/created
