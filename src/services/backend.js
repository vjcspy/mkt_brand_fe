import path from "path";
import Axios from "axios";
import { each, get, sortBy } from "lodash";

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

export const getSiteServer = async (site_code) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  return Axios.get(`${host}/sites/config/${site_code}`);
};

export const getApiKeyGoogleMap = async () => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.get(`${host}/get-configs`);
};

export const getSection = (site, page, sectionName) => {
  return site.config.pages[page].sections.find((item) => item.name === sectionName);
};
export const getPromoActive = (promoSection) => {
  return promoSection.components?.promoBanner.value.filter((item) => item.statusPromo.value.active === "Show");
};

export const getSlug = async (slug) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  return Axios.post(`${host}/graphql`, {
    query: `query {
        blogs (where: {slug:"${slug}"}){
          slug
          title
          content
          like
          view
          share
          comment
        }
        
      }`,
  });
};

export const getListBlog = async () => {
  const host = process.env.NEXT_PUBLIC_API_HOST;

  return Axios.post(`${host}/graphql`, {
    query: `query {
        blogs{
          isShow
          slug
          title
          like
          view
          share
          comment
          avatar {
            url
          }
        }
      }`,
  });
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

// get promo

export const getListPromo = (provinceId = 5) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.get(`${host}/get-posts`, {
    params: {
      provinceId,
    },
    headers: {
      "tgs-version": "2.6.10",
    },
  });
};

// pickUpVoucher

export const pickUpVoucher = ({ code, quantity = 1, token }) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.post(
    `${host}/pick-up-voucher`,
    {
      promotionId: code,
      quantity: quantity,
    },
    {
      headers: {
        "tgs-version": "2.6.10",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// get list restaurant by Id

export const getListRestaurant = ({ brandId = 7, provinceId = 5 }) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.get(`${host}/restaurant`, {
    params: {
      brandId,
      provinceId,
    },
    headers: {
      "tgs-version": "2.6.10",
    },
  });
};

export const getProvinces = () => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.get(`${host}/province`, {
    headers: {
      "tgs-version": "2.6.10",
    },
  });
};
