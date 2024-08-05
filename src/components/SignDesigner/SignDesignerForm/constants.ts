import {
  SizeConfig,
  FontFamily,
  Size,
  DesignFormInputs,
} from "@/src/components/SignDesigner/types"

export const designOptions: any = {
  rectangle: {
    horizontal: {
      small: {
        maxLinesOfText: 1,
      },
      medium: {
        maxLinesOfText: 2,
      },
    },
    vertical: {
      small: {
        maxLinesOfText: 1,
      },
      medium: {
        maxLinesOfText: 1,
      },
    },
  },
  ellipse: {
    horizontal: {
      small: {
        maxLinesOfText: 1,
      },
      medium: {
        maxLinesOfText: 2,
      },
    },
    vertical: {
      small: {
        maxLinesOfText: 1,
      },
    },
  },
  topRound: {
    horizontal: {
      small: {
        maxLinesOfText: 1,
      },
      medium: {
        maxLinesOfText: 2,
      },
    },
  },
  sideRound: {
    horizontal: {
      small: {
        maxLinesOfText: 1,
      },
    },
    vertical: {
      small: {
        maxLinesOfText: 1,
      },
    },
  },
  bread: {
    horizontal: {
      small: {
        maxLinesOfText: 1,
      },
      medium: {
        maxLinesOfText: 2,
      },
    },
  },
}

// const options = {
//   rectangle: {
//     small: {
//       horizontal: {
//         maxLinesOfText: 1,
//       },
//       vertical: {
//         maxLinesOfText: 1,
//       },
//     },
//     medium: {
//       horizontal: {
//         maxLinesOfText: 2,
//       },
//       vertical: {
//         maxLinesOfText: 1,
//       },
//     },
//   },
//   ellipse: {
//     small: {
//       horizontal: {
//         maxLinesOfText: 1,
//       },
//       vertical: {
//         maxLinesOfText: 1,
//       },
//     },
//   },
//   topRound: {
//     small: {
//       horizontal: {
//         maxLinesOfText: 1,
//       },
//     },
//     medium: {
//       horizontal: {
//         maxLinesOfText: 2,
//       },
//     },
//   },
// }
export const signProductId = 112

export const product = {
  id: "UHJvZHVjdDoxMTI=",
  handle: "/custom-sign/",
  availableForSale: true,
  title: "Custom Sign",
  description: "",
  descriptionHtml: "",
  options: [
    {
      id: "127",
      name: "shape",
      values: [
        {
          label: "rectangle",
          entityId: 129,
        },
        {
          label: "ellipse",
          entityId: 130,
        },
      ],
    },
    {
      id: "119",
      name: "shape_modifier",
      values: [
        {
          label: "rectangle",
          entityId: 112,
        },
        {
          label: "ellipse",
          entityId: 113,
        },
        {
          label: "topRound",
          entityId: 114,
        },
        {
          label: "sideRound",
          entityId: 115,
        },
        {
          label: "bread",
          entityId: 116,
        },
      ],
    },
    {
      id: "120",
      name: "orientation_modifier",
      values: [
        {
          label: "horizontal",
          entityId: 117,
        },
        {
          label: "vertical",
          entityId: 118,
        },
      ],
    },
    {
      id: "121",
      name: "size_modifier",
      values: [
        {
          label: "small",
          entityId: 119,
        },
        {
          label: "medium",
          entityId: 120,
        },
      ],
    },
    {
      id: "117",
      name: "textLine",
      values: [],
    },
    {
      id: "118",
      name: "font",
      values: [
        {
          label: "times",
          entityId: 110,
        },
        {
          label: "verdana",
          entityId: 111,
        },
      ],
    },
    {
      id: "123",
      name: "color",
      values: [
        {
          label: "black/white",
          entityId: 121,
        },
        {
          label: "tan/green",
          entityId: 122,
        },
        {
          label: "yellow/black",
          entityId: 123,
        },
      ],
    },
    {
      id: "122",
      name: "svgRaw",
      values: [],
    },
    {
      id: "124",
      name: "svgFile",
      values: [],
    },
  ],
  priceRange: {
    maxVariantPrice: {
      amount: "20",
      currencyCode: "USD",
    },
    minVariantPrice: {
      amount: "20",
      currencyCode: "USD",
    },
  },
  variants: [
    {
      parentId: "112",
      id: "149",
      title: "",
      availableForSale: true,
      selectedOptions: [
        {
          name: "shape",
          value: "rectangle",
        },
      ],
      price: {
        amount: "20",
        currencyCode: "USD",
      },
    },
    {
      parentId: "112",
      id: "150",
      title: "",
      availableForSale: true,
      selectedOptions: [
        {
          name: "shape",
          value: "ellipse",
        },
      ],
      price: {
        amount: "20",
        currencyCode: "USD",
      },
    },
  ],
  images: [],
  featuredImage: {
    url: "",
    altText: "",
    width: 2048,
    height: 2048,
  },
  seo: {
    title: "Custom Sign",
    description: "",
  },
  tags: [""],
  updatedAt: "2024-04-17T15:47:21Z",
}

const PRODUCT_INPUT_MAP = {
  shape: {
    // id: "127",
    // values: [],
    entityId: 119,
    rectangle: 112,
    ellipse: 113,
    topRound: 114,
    sideRound: 115,
    bread: 116,
  },

  orientation: {
    entityId: 120,
    horizontal: 117,
    vertical: 118,
  },
  size: {
    entityId: 121,
    small: 119,
    medium: 120,
  },
  textLine: {
    entityId: 117,
  },
  font: {
    entityId: 118,
    times: 110,
    verdana: 111,
  },
  color: {
    entityId: 123,
    "black/white": 121,
    "tan/green": 122,
    "yellow/black": 123,
  },
  // svgRaw: {
  //   entityId: 122,
  // },
  svgFile: {
    entityId: 124,
  },
}

export const FONT_MAP: { [key in FontFamily]: string } = {
  Arbutus: "ArbutusSlab-Regular.ttf",
  Danfo: "Danfo-Regular.ttf",
  AdventPro: "AdventPro-Bold.ttf",
  JosefinSlab: "JosefinSlab-Bold.ttf",
  DMSerif: "DMSerifDisplay-Regular.ttf",
  Sancreek: "Sancreek-Regular.ttf",
  Rye: "Rye-Regular.ttf",
  SpicyRice: "SpicyRice-Regular.ttf",
  Ultra: "Ultra-Regular.ttf",
  Shrikhand: "Shrikhand-Regular.ttf",
  Limelight: "Limelight-Regular.ttf",
  Audiowide: "Audiowide-Regular.ttf",
  TacOne: "TacOne-Regular.ttf",
  AoboshiOne: "AoboshiOne-Regular.ttf",
  BagelFatOne: "BagelFatOne-Regular.ttf",
  GermaniaOne: "GermaniaOne-Regular.ttf",
  XCompany: "XCompany.ttf",
  Gerhaus: "Gerhaus.ttf",
  LifeKittie: "LifeKittie.ttf",
  QuantifierNbp: "QuantifierNbp.ttf",
  EdgeOfTheGalaxy: "EdgeOfTheGalaxy.otf",
  Forque: "Forque.ttf",
  Airstream: "Airstream.ttf",
  Gemola: "Gemola.ttf",
}

export const SIZE_CONFIG_MAP: { [key in Size]: SizeConfig } = {
  "extra small": {
    width: 15,
    height: 3.5,
    maxLinesOfText: 1,
  },
  "extra small vertical": {
    width: 3.5,
    height: 15,
    maxLinesOfText: 1,
  },
  small: {
    //   horizontal: {
    //     width: 1500,
    //     height: 700,
    //     maxLinesOfText: 1,
    //   },
    //   vertical: {
    //     width: 700,
    //     height: 1500,
    //     maxLinesOfText: 1,
    //   },
    width: 15,
    height: 7.5,
    maxLinesOfText: 1,
  },
  medium: {
    // horizontal: {
    //   width: 1500,
    //   height: 1000,
    //   maxLinesOfText: 2,
    // },
    // vertical: {
    //   width: 1000,
    //   height: 1500,
    //   maxLinesOfText: 1,
    // },
    width: 15,
    height: 9,
    maxLinesOfText: 2,
  },
  large: {
    //   horizontal: {
    //     width: 1400,
    //     height: 1200,
    //     maxLinesOfText: 2,
    //   },
    //   vertical: {
    //     width: 1200,
    //     height: 1400,
    //     maxLinesOfText: 1,
    //   },
    width: 15,
    height: 11,
    maxLinesOfText: 3,
  },
  "extra large": {
    //   horizontal: {
    //     width: 1500,
    //     height: 1400,
    //     maxLinesOfText: 3,
    //   },
    //   vertical: {
    //     width: 1400,
    //     height: 1500,
    //     maxLinesOfText: 1,
    //   },
    width: 23,
    height: 9.5,
    maxLinesOfText: 3,
  },
}

export const DEFAULT_FORM_VALUES: DesignFormInputs = {
  shape: "rectangle",
  size: "large",
  color: "black::white",
  fontFamily: "Arbutus",
  mountingStyle: "wall mounted",
  edgeStyle: "square",
  borderWidth: "0.2",
  textLines: [
    { value: "", fontSize: "2", offset: "0" },
    { value: "", fontSize: "2", offset: "0" },
    { value: "", fontSize: "2", offset: "0" },
  ],
}

// export const PAGE_LIMIT = 100
export const BOLT_OFFSET = 0.25
// export const BOLT_RADIUS = 0.125
export const BOLT_RADIUS = 0.1
