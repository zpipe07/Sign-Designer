export async function GET(request: Request) {
  const res = await fetch(
    "https://store-dh8nzctx6e.mybigcommerce.com/graphql",
    {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOltdLCJlYXQiOjE4ODU2MzUxNzYsImlhdCI6MTcxMzM2OTk5OCwiaXNzIjoiQkMiLCJzaWQiOjEwMDMxNzE1NDIsInN1YiI6IjI1cjdvMjRndGwzcGRkN3FocDNlbDNtaTliZGZjODEiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6Mn0.5G2NHc1Ta56o6hN2zOnwb8BAteHoTFDkXvh1lM__s0Q7Mi42BEHVkHPjMC_Ls24wxa5bsh81HozhakHyq6AKeg", // use auto-generated token
      },
      body: JSON.stringify({
        query: `query GetAllProducts {
          site {
            settings {
              storeName
            }
            products {
              edges {
                node {
                  name
                  sku
                  defaultImage {
                    url(width: 1280)
                  }
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        options(first: 10) {
                          edges {
                            node {
                              displayName
                              values {
                                edges {
                                  node {
                                    label
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    },
  )
  const data = await res.json()

  return Response.json(data)
}
