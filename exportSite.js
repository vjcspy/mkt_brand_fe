const Axios = require("axios");
const fs = require("fs");
const cp = require("child_process");
const { get, sortBy, each } = require("lodash");
require("dotenv-flow").config();

exports.exportSite = void 0;

const fetchMenuCategories = async ({ pageSize = 20, currentPage = 1, urlKey = "gogi" } = {}) => {
  const categoryItem = function (level = 3) {
    return `
    id
    name
    position
    description
    image
    url_path
    url_key
    children_count
    canonical_url
    level
    path
    ${
      level > 0
        ? `
    children { 
      ${categoryItem(level - 1)}
    }`
        : ""
    }
    products(pageSize: 20, currentPage: 1, sort: {}) {
      items {
        id
        description {
          html
        }
        image {
          disabled
          label
          position
          url
        }
        name
        price_tiers {
          quantity
        }
        product_links {
          link_type
          linked_product_sku
          linked_product_type
          position
          sku
        }
        short_description {
          html
        }
        sku
        small_image {
          disabled
          label
          position
          url
        }
        tier_prices {
          customer_group_id
          percentage_value
          qty
          value
          website_id
        }
        url_key
      }
    }
  `;
  };
  const { data } = await Axios.post(process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql", {
    query: `
    query {
      categories(filters: { url_key: { eq: "${urlKey}" } }, pageSize: ${pageSize}, currentPage: ${currentPage}) {
        items {${categoryItem()}}
        page_info {
          total_pages
          page_size
        }
        total_count
      }
    }
    `,
  });
  const menu = get(data, ["data", "categories", "items", 0]);
  function sort(m) {
    if (get(m, ["children", "length"]) > 0) {
      m.children = sortBy(m.children, "position");
      each(m.children, (m1) => sort(m1.children));
    }
    return m;
  }
  return sort(menu);
  // return reduceRight(groupBy(get(data, ["data", "categories", "items"]), "level"), (arr, current) =>
  //   map(current, (item) =>
  //     assign(item, {
  //       items: filter(arr, (child) => includes(map(item.children, "id"), child.id)),
  //     })
  //   )
  // );
};

async function fetchSite(site_code) {
  const host = process.env.API_HOST;
  let {
    data: { jwt },
  } = await Axios.post(`${host}/auth/local`, {
    identifier: process.env.NEXTJS_USERNAME,
    password: process.env.NEXTJS_PASSWORD,
  });

  const { data } = await Axios.get(`${host}/sites/config/${site_code}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
}

function getData() {
  let d = [];
  try {
    d = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
  } catch (e) {
    console.log(e);
  }
  return d;
}

async function fetchData(site_code) {
  const siteData = await fetchSite(site_code);
  try {
    const menu = await fetchMenuCategories({ urlKey: site_code });
    siteData.menu = menu;
  } catch (e) {
    console.log(e.message);
  }
  const data = getData();
  const index = data.findIndex((s) => s.site_code === site_code);
  if (index != -1) {
    data[index] = siteData;
  } else {
    data.push(siteData);
  }
  fs.writeFileSync("./data.json", JSON.stringify(data));
}

async function exportSite(site_code) {
  const brand = site_code || process.env.SITE_CODE || "gogi";
  await fetchData(brand);
  const buildResult = cp.spawnSync("yarn", ["build"], { env: { ...process.env, SITE_CODE: brand } });
  if (buildResult.stdout) {
    console.log("Build Succeed");
  }
  if (buildResult.error) {
    console.log(buildResult.error);
  }

  const exportResult = cp.spawnSync("yarn", ["export", "-o", `./build/${brand}`], {
    env: { ...process.env, SITE_CODE: brand },
  });
  if (exportResult.stdout) {
    console.log("Export Succeed");
  }
  if (exportResult.error) {
    console.log(exportResult.error);
  }
}

// (async () => {
//   const menu = await fetchMenuCategories({ urlKey: "gogi" });
//   console.log(JSON.stringify(menu));
// })();

// exportSite();
exports.exportSite = exportSite;
