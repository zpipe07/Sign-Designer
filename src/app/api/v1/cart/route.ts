import { bigCommerceFetch } from "@/src/lib/bigcommerce"
import { createCartMutation } from "@/src/lib/bigcommerce/mutations/cart"
import { BigCommerceCreateCartOperation } from "@/src/lib/bigcommerce/types"

export async function POST(request: Request) {
  // create cart
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
