const productsBuffet = [
  {
    id: "0",
    name: "Buffet Xèo Xèo",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/product_1_19829db44d.jpg" },
    price_range: {
      minimum_price: 329000,
    },
    short_description: "- 10+ thịt bò hảo hạng\n- 20+ salad\n- Đa dạng hoa quả, tráng miệng",
    description:
      "<p>Thịt bò Wagyu được xem là loại thịt cực phẩm nổi tiếng khắp thế giời bởi thịt ngon và mềm. Đặc trưng của loại thịt bò Wagyu hảo hạng là vân mỡ cẩm thạch phân bổ xen kẽ các thớ thịt đỏ với tỷ lệ đồng đều. Thành phần thịt và mỡ cân bằng tạo nên hương vị tuyệt đỉnh.</p>",
  },
  {
    id: "1",
    name: "Buffet 369k",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/product_2_73ce4ccbde.jpg" },
    price_range: {
      minimum_price: 369000,
    },
    short_description: "- 10+ thịt bò hảo hạng\n- 20+ salad\n- Đa dạng hoa quả, tráng miệng",
    description:
      "<p>Thịt bò Wagyu được xem là loại thịt cực phẩm nổi tiếng khắp thế giời bởi thịt ngon và mềm. Đặc trưng của loại thịt bò Wagyu hảo hạng là vân mỡ cẩm thạch phân bổ xen kẽ các thớ thịt đỏ với tỷ lệ đồng đều. Thành phần thịt và mỡ cân bằng tạo nên hương vị tuyệt đỉnh.</p>",
  },
  {
    id: "2",
    name: "Buffet 489k",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/product_3_97f1f0cb8b.jpg" },
    price_range: {
      minimum_price: 489000,
    },
    short_description: "- 10+ thịt bò hảo hạng\n- 20+ salad\n- Đa dạng hoa quả, tráng miệng",
    description:
      "<p>Thịt bò Wagyu được xem là loại thịt cực phẩm nổi tiếng khắp thế giời bởi thịt ngon và mềm. Đặc trưng của loại thịt bò Wagyu hảo hạng là vân mỡ cẩm thạch phân bổ xen kẽ các thớ thịt đỏ với tỷ lệ đồng đều. Thành phần thịt và mỡ cân bằng tạo nên hương vị tuyệt đỉnh.</p>",
  },
];

const productsCombo = [
  {
    id: "0",
    name: "Combo Iberico",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/combo_lberico_05aab797e2.jpg" },
    price_range: {
      minimum_price: 329000,
    },
    short_description: "- ba chỉ bò\n- Gầu bò\n- Kem dừa",
    description:
      "<h5>(2-4 người)</h5><p>Thịt bò Wagyu được xem là loại thịt cực phẩm nổi tiếng khắp thế giời bởi thịt ngon và mềm. Đặc trưng của loại thịt bò Wagyu hảo hạng là vân mỡ cẩm thạch phân bổ xen kẽ các thớ thịt đỏ với tỷ lệ đồng đều. Thành phần thịt và mỡ cân bằng tạo nên hương vị tuyệt đỉnh.</p>",
  },
  {
    id: "1",
    name: "Combo Bò Mỹ",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/combo_bo_mi_1ca10af780.jpg" },
    price_range: {
      minimum_price: 329000,
    },
    short_description: "- ba chỉ bò\n- Gầu bò\n- Kem dừa",
    description:
      "<h5>(2-4 người)</h5><p>Thịt bò Wagyu được xem là loại thịt cực phẩm nổi tiếng khắp thế giời bởi thịt ngon và mềm. Đặc trưng của loại thịt bò Wagyu hảo hạng là vân mỡ cẩm thạch phân bổ xen kẽ các thớ thịt đỏ với tỷ lệ đồng đều. Thành phần thịt và mỡ cân bằng tạo nên hương vị tuyệt đỉnh.</p>",
  },
  {
    id: "2",
    name: "Combo Wagyu",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/combo_wagyu_5cdf70e1ef.jpg" },
    price_range: {
      minimum_price: 489000,
    },
    short_description: "- ba chỉ bò\n- Gầu bò\n- Kem dừa",
    description:
      "<h5>(2-4 người)</h5><p>Thịt bò Wagyu được xem là loại thịt cực phẩm nổi tiếng khắp thế giời bởi thịt ngon và mềm. Đặc trưng của loại thịt bò Wagyu hảo hạng là vân mỡ cẩm thạch phân bổ xen kẽ các thớ thịt đỏ với tỷ lệ đồng đều. Thành phần thịt và mỡ cân bằng tạo nên hương vị tuyệt đỉnh.</p>",
  },
];

const productsMeat = [
  {
    id: "0",
    name: "Ba chỉ bò",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/ba_chi_bo_5d619dd32f.jpg" },
  },
  {
    id: "1",
    name: "Gầu bò",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/gaubo_82b72935d6.jpg" },
  },
  {
    id: "2",
    name: "Dẻ sườn bò Mỹ",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/de_suon_my_bf88bab86c.jpg" },
  },
  {
    id: "3",
    name: "Thăn vai bò",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/ba_chi_bo_5d619dd32f.jpg" },
  },
  {
    id: "4",
    name: "Lõi vai bò",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/gaubo_82b72935d6.jpg" },
  },
  {
    id: "5",
    name: "Sườn bò",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/de_suon_my_bf88bab86c.jpg" },
  },
  {
    id: "6",
    name: "Bò cuộn",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/ba_chi_bo_5d619dd32f.jpg" },
  },
  {
    id: "7",
    name: "Nạm bò",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/gaubo_82b72935d6.jpg" },
  },
  {
    id: "8",
    name: "Ba chỉ tươi",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/de_suon_my_bf88bab86c.jpg" },
  },
];

export const menus = [
  {
    name: "Buffet",
    type: "category",
    slug: "buffet",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/buffet_0e7d4d0994.jpg" },
    items: [
      {
        name: "Buffet Xèo Xèo",
        items: [
          {
            name: "Thịt bò",
            products: productsMeat,
          },
          {
            name: "Rau",
          },
          {
            name: "Đồ uống",
          },
          {
            name: "Tráng miệng",
          },
        ],
      },
      {
        name: "Buffet 369k",
        items: [
          {
            name: "Thịt bò",
          },
          {
            name: "Rau",
          },
          {
            name: "Đồ uống",
          },
          {
            name: "Tráng miệng",
          },
        ],
      },
      {
        name: "Buffet 489k",
        items: [
          {
            name: "Thịt bò",
          },
          {
            name: "Rau",
          },
          {
            name: "Đồ uống",
          },
          {
            name: "Tráng miệng",
          },
        ],
      },
    ],
    products: productsBuffet,
    price_range: {
      minimum_price: 329000,
    },
  },
  {
    name: "Combo",
    type: "category",
    slug: "combo",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/buffet_0e7d4d0994.jpg" },
    items: [
      {
        name: "Combo Iberico",
        products: productsMeat,
      },
      {
        name: "Combo Bò Mỹ",
      },
      {
        name: "Combo Wagyu",
      },
    ],
    products: productsCombo,
    price_range: {
      minimum_price: 329000,
    },
  },
  {
    name: "Món lẻ",
    slug: "mon-le",
    image: { url: "https://ggg-api.s3.ap-southeast-1.amazonaws.com/buffet_0e7d4d0994.jpg" },
    items: [
      {
        name: "Thịt bò",
        products: productsMeat,
      },
      {
        name: "Rau",
      },
      {
        name: "Đồ uống",
      },
      {
        name: "Tráng miệng",
      },
    ],
    price_range: {
      minimum_price: 329000,
    },
  },
];
