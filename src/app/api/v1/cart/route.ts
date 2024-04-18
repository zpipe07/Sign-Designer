import { bigCommerceFetch } from "@/src/lib/bigcommerce"
import { createCartMutation } from "@/src/lib/bigcommerce/mutations/cart"
import { BigCommerceCreateCartOperation } from "@/src/lib/bigcommerce/types"

export async function GET(request: Request) {
  // get cart
}

export async function POST(request: Request) {
  // create cart
  // const res = await fetch(
  //   "https://store-dh8nzctx6e.mybigcommerce.com/graphql",
  //   {
  //     method: "POST",
  //     credentials: "same-origin",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOltdLCJlYXQiOjE4ODU2MzUxNzYsImlhdCI6MTcxMzM2OTk5OCwiaXNzIjoiQkMiLCJzaWQiOjEwMDMxNzE1NDIsInN1YiI6IjI1cjdvMjRndGwzcGRkN3FocDNlbDNtaTliZGZjODEiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6Mn0.5G2NHc1Ta56o6hN2zOnwb8BAteHoTFDkXvh1lM__s0Q7Mi42BEHVkHPjMC_Ls24wxa5bsh81HozhakHyq6AKeg", // use auto-generated token
  //     },
  //     body: JSON.stringify({
  //       query: `mutation createCart($createCartInput: CreateCartInput!) {
  //         cart {
  //           createCart(input: $createCartInput) {
  //             cart {
  //               entityId
  //               lineItems {
  //                 physicalItems {
  //                   name
  //                   quantity
  //                 }
  //                 digitalItems {
  //                   name
  //                   quantity
  //                 }
  //                 giftCertificates {
  //                   name
  //                 }
  //                 customItems {
  //                   name
  //                   quantity
  //                 }
  //               }
  //             }
  //           }
  //         }`,
  //       // variables: {
  //       //   createCartInput: {
  //       //     lineItems: [
  //       //       {
  //       //         quantity: 1,
  //       //         productEntityId: 112,
  //       //       },
  //       //     ],
  //       //   },
  //       // },
  //       variables: {
  //         createCartInput: {
  //           lineItems: [
  //             {
  //               quantity: 1,
  //               productEntityId: 112,
  //               variantEntityId: 77,
  //               selectedOptions: {
  //                 multipleChoices: [
  //                   { optionEntityId: 119, optionValueEntityId: 1 },
  //                   { optionEntityId: 118, optionValueEntityId: 2 },
  //                 ],
  //                 textFields: [
  //                   { optionEntityId: 117, text: "Example text" },
  //                 ],
  //               },
  //             },
  //           ],
  //           // lineItems: lines.map(({ merchandiseId, quantity, productId }) => ({
  //           //   productEntityId: parseInt(productId!, 10),
  //           //   variantEntityId: parseInt(merchandiseId, 10),
  //           //   quantity
  //           // }))
  //         },
  //       },
  //     }),
  //   },
  // )
  // const data = await res.json()

  // return Response.json(data)

  const res = await bigCommerceFetch<BigCommerceCreateCartOperation>({
    query: createCartMutation,
    variables: {
      createCartInput: {
        lineItems: [
          {
            quantity: 1,
            productEntityId: 112,
            variantEntityId: 77,
            selectedOptions: {
              multipleChoices: [
                { optionEntityId: 119, optionValueEntityId: 112 },
                { optionEntityId: 118, optionValueEntityId: 110 },
              ],
              textFields: [
                { optionEntityId: 117, text: "Example text" },
              ],
            },
          },
        ],
      },
    },
  })
  return Response.json(res)
}
