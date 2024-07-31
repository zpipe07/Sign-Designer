import opentype from "opentype.js"
import { promises as fs } from "fs"
import { decode } from "base64-arraybuffer"

import {
  BigCommerceOrder,
  BigCommerceOrderProduct,
  BigCommerceWebhookPayload,
} from "@/src/lib/bigcommerce/types"
import { createClient } from "@/src/utils/supabase/server"
import path from "path"
import {
  FONT_MAP,
  SIZE_CONFIG_MAP,
} from "@/src/components/SignDesigner/SignDesignerForm/constants"
import {
  Color,
  ColorCombo,
  EdgeStyle,
  FontFamily,
  MountingStyle,
  Shape,
  Size,
  TextLine,
} from "@/src/components/SignDesigner/types"
import { generateModel } from "@/src/utils/makerjs"
import { getFilename } from "@/src/utils"

export async function POST(request: Request) {
  const body: BigCommerceWebhookPayload = await request.json()
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v2/orders/${body.data.id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-Auth-Token": process.env.ORDERS_ACCESS_TOKEN!,
      },
      cache: "no-store",
    },
  )
  const order: BigCommerceOrder = await res.json()
  const productUrl = `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v2/orders/${body.data.id}/products`
  const productsRes = await fetch(productUrl, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-Auth-Token": process.env.ORDERS_ACCESS_TOKEN!,
    },
    cache: "no-store",
  })
  const products: BigCommerceOrderProduct[] = await productsRes.json()

  for (const product of products) {
    const borderWidth = product.product_options?.find(
      (option) => option.display_name === "border_width",
    )?.display_value!
    const color = product.product_options?.find(
      (option) => option.display_name === "color",
    )?.display_value as ColorCombo
    const edgeStyle = product.product_options?.find(
      (option) => option.display_name === "edge_style",
    )?.display_value as EdgeStyle
    const fontFamily = product.product_options?.find(
      (option) => option.display_name === "font",
    )?.display_value as FontFamily
    const mountingStyle = product.product_options?.find(
      (option) => option.display_name === "mounting_style",
    )?.display_value as MountingStyle
    const shape = product.product_options?.find(
      (option) => option.display_name === "shape",
    )?.display_value as Shape
    const size = product.product_options?.find(
      (option) => option.display_name === "size",
    )?.display_value as Size
    const textLines = JSON.parse(
      product.product_options?.find(
        (option) => option.display_name === "text_lines",
      )?.display_value!,
    ) as TextLine[]

    console.log({
      borderWidth,
      color,
      edgeStyle,
      fontFamily,
      mountingStyle,
      shape,
      size,
      textLines,
    })

    const dirRelativeToPublicFolder = "fonts"
    const dir = path.resolve("./public", dirRelativeToPublicFolder)
    const fontUrl = `${dir}/${FONT_MAP[fontFamily]}`
    const font = opentype.loadSync(`${fontUrl}`)
    const { height, width } = SIZE_CONFIG_MAP[size]
    const [foregroundColor, backgroundColor] = color.split(
      "::",
    ) as Color[]
    const modelInputs = {
      height,
      width,
      outerBorderWidth: 0.3,
      innerBorderWidth: parseFloat(borderWidth),
      textLines,
      foregroundColor,
      backgroundColor,
      inputs: {
        borderWidth,
        color,
        edgeStyle,
        fontFamily,
        mountingStyle,
        shape,
        size,
        textLines,
      },
      font,
    }
    const { svg } = generateModel({
      ...modelInputs,
      strokeOnly: true,
      actualDimensions: true,
    })

    const filename = getFilename(
      order.id,
      product.id,
      color,
      textLines,
    )
    await fs.writeFile(`/tmp/${filename}`, svg)
    const svgFile = await fs.readFile(`/tmp/${filename}`, {
      encoding: "base64",
    })
    const supabase = createClient()
    const { error } = await supabase.storage
      .from("signs")
      .upload(filename, decode(svgFile), {
        contentType: "image/svg+xml",
      })

    if (error) {
      throw error
    }
    // const fileIdOption = product.product_options.find(
    //   (option) => option.display_name === "file_id",
    // )
    // const fileId = fileIdOption?.value
    // const supabase = createClient()
    // const { error } = await supabase.storage
    //   .from("signs")
    //   .move(
    //     `${fileId}--path-only.svg`,
    //     `${order.id}-${product.id}-${fileId}--path-only.svg`,
    //   )

    // if (error) {
    //   throw error
    // }
  }

  return Response.json({ status: "ok" })
}

// /api/v1/webhooks/bigcommerce/orders/created
// https://sign-designer.vercel.app/api/v1/webhooks/bigcommerce/orders/created

// POST https://api.bigcommerce.com/stores/dh8nzctx6e/v3/hooks
// POST https://api.bigcommerce.com/stores/fnurpzpyyh/v3/hooks
// X-Auth-Token: epmvjeckmcqziy8iap0qomdtnduzc95
// Content-Type: application/json
// Accept: application/json
// {
//   "scope": "store/order/created",
//   "destination": "https://sign-designer.vercel.app/api/v1/webhooks/bigcommerce/orders/created",
//   "destination": "https://signgenie.io/api/v1/webhooks/bigcommerce/orders/created",
//   "is_active": true,
//   "headers": {}
// }

// payload
// {
//   producer: 'stores/dh8nzctx6e',
//   hash: '1bc82bf2892e33912d3abf5eb38cebd825b6a3e8',
//   created_at: 1721150877,
//   store_id: '1003171542',
//   scope: 'store/order/created',
//   data: { type: 'order', id: 134 }
// }
