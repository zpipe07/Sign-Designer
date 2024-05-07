import fs from "fs"
import { decode } from "base64-arraybuffer"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { addToCart } from "@/src/lib/bigcommerce"
import { formDataToCartItem } from "@/src/lib/bigcommerce/mappers"
import { createClient } from "@/src/utils/supabase/server"

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } },
) {
  // generate SVG file
  const file = fs.readFileSync("./6447SVG.svg", {
    encoding: "base64",
  })

  // save file to supabase
  const supabase = createClient()
  const { data, error } = await supabase.storage
    .from("signs")
    .upload("sign4.svg", decode(file), {
      contentType: "image/svg+xml",
    })
  console.log({ data, error })

  // save reference to file
  const formData: DesignFormInputs = await request.json()
  const lineItem = await formDataToCartItem(formData)
  const cart = await addToCart(params.cartId, [lineItem])

  return Response.json({ cart })
}
