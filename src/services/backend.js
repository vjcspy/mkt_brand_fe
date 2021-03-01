import fs from "fs";
import path from "path";
import Axios from "axios";
import { get } from "lodash";

export const getGlobalToken = async () => {
  global.jwtToken;
  if (!global.jwtToken) {
    const host = process.env.API_HOST;
    let {
      data: { jwt },
    } = await Axios.post(`${host}/auth/local`, {
      identifier: process.env.NEXTJS_USERNAME,
      password: process.env.NEXTJS_PASSWORD,
    });
    global.jwtToken = jwt;
  }
  return global.jwtToken;
};

export const getGlobalSites = async () => {
  const postsDirectory = path.join(process.cwd(), "data.json");
  const data = JSON.parse(fs.readFileSync(postsDirectory, "utf-8"));
  return data;
};

export const getSitePaths = async () => {
  const sites = await getGlobalSites();
  return sites.map((s) => ({
    params: {
      site: s.site_code,
    },
  }));
};

export const getSite = async (site_code) => {
  const sites = await getGlobalSites();
  return sites.find((site) => site.site_code === site_code);
};

export const fetchMenuCategories = async ({ pageSize = 20, currentPage = 1, urlKey = "gogi" } = {}) => {
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
  const { data } = await Axios.post(process.env.GRAPHQL_HOST, {
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
  return get(data, ["data", "categories", "items", 0]);
  // return reduceRight(groupBy(get(data, ["data", "categories", "items"]), "level"), (arr, current) =>
  //   map(current, (item) =>
  //     assign(item, {
  //       items: filter(arr, (child) => includes(map(item.children, "id"), child.id)),
  //     })
  //   )
  // );
};
