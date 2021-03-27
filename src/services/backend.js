import path from "path";
import Axios from "axios";
import { each, get, sortBy, chain } from "lodash";
import { PROMO_FLASH_SALE, PROMO_NORMAL } from "../constants";

export const getWebsitesData = async () => {
  const { data } = await Axios.post(process.env.GRAPHQL_HOST.replace("/graphql", "/rest/V1/izretail/dispatch"), {
    action: {
      type: "get-websites",
      payload: {},
    },
  });

  return data;
};

export const getSiteCode = async (name) => {
  const webSite = await getWebsitesData();
  return chain(webSite)
    .get(["data", "rows"])
    .find((e) => e.name === name)
    .value();
};

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

export const fetchMenuCategories = async ({
  pageSize = 20,
  currentPage = 1,
  urlKey = "gogi",
  storeCode = "gogi_royal",
} = {}) => {
  const productFragment = `fragment product on ProductInterface{__typename id name attribute_set_id description{html}gift_message_available image{url}only_x_left_in_stock options_container price_range{maximum_price{discount{amount_off percent_off}final_price{currency value}}minimum_price{discount{amount_off percent_off}final_price{currency value}}}short_description{html}sku stock_status thumbnail{url}url_key}`;
  const bundleProductFragment = `fragment bundle on BundleProduct{items{__typename position required title option_id options{product{...product}}}}`;
  const categoryTreeChild = `fragment categoryTreeChild on CategoryTree{id level name path position url_key}`;
  const categoryTree = `fragment categoryTree on CategoryTree{id level name path position children{...categoryTreeChild}url_key}`;
  const categoryResult = `fragment category on CategoryResult{items{id name position description url_key children_count canonical_url level path children{...categoryTree}}}`;
  const query = `query{categories(filters:{url_key:{eq:"${urlKey}"}}pageSize:${pageSize} currentPage:${currentPage}){...category page_info{total_pages}total_count}}`;

  const { data } = await Axios.post(
    process.env.GRAPHQL_HOST,
    { query: `${categoryTreeChild} ${categoryTree} ${categoryResult} ${query}` },
    { headers: { Store: storeCode } }
  );
  function sort(m) {
    if (get(m, ["children", "length"]) > 0) {
      m.children = sortBy(m.children, "position");
      each(m.children, (m1) => sort(m1.children));
    }
    return m;
  }
  const menu = sort(get(data, ["data", "categories", "items", 0]));

  const categoriesIds = [];
  menu.children.forEach(({ id, children }) => {
    categoriesIds.push(id);
    children?.forEach(({ id }) => {
      categoriesIds.push(id);
    });
  });

  const productList = await Promise.all(
    categoriesIds.map((id) => fetchMenuCategoriesListingData({ categoryId: id, storeCode }))
  );
  const categories = categoriesIds.map((id, i) => ({ id, products: productList[i] }));

  const menus = menu.children.map((category, i) => {
    if (category.children?.length) {
      category.children.map((category) =>
        Object.assign(category, { products: categories.find((c) => c.id === category.id).products })
      );
    }
    const products = categories.find((c) => c.id === category.id).products;
    if (get(products, [0, "__typename"]) === "BundleProduct") {
      category.isBundle = true;
    }
    return Object.assign(category, { products });
  });

  return menus;
  // return reduceRight(groupBy(get(data, ["data", "categories", "items"]), "level"), (arr, current) =>
  //   map(current, (item) =>
  //     assign(item, {
  //       items: filter(arr, (child) => includes(map(item.children, "id"), child.id)),
  //     })
  //   )
  // );
};

export const fetchMenuCategoriesListingData = async ({ categoryId, storeCode = "gogi_royal" }) => {
  const productFragment = `fragment product on ProductInterface{__typename id name attribute_set_id description{html}gift_message_available image{url}only_x_left_in_stock options_container price_range{maximum_price{discount{amount_off percent_off}final_price{currency value}}minimum_price{discount{amount_off percent_off}final_price{currency value}}}short_description{html}sku stock_status thumbnail{url}url_key}`;
  const bundleProductFragment = `fragment bundle on BundleProduct{items{__typename position required title option_id options{product{...product}}}}`;
  const query = `query{catalogCategoryListingData(search:"" filters:{code:"category_id",data:{eq:"${categoryId}"}}pageSize:100 currentPage:1){items{...product ...bundle}page_info{total_pages}total_count}}`;

  const { data } = await Axios.post(
    process.env.GRAPHQL_HOST,
    { query: `${productFragment} ${bundleProductFragment} ${query}` },
    { headers: { Store: storeCode } }
  );

  return get(data, ["data", "catalogCategoryListingData", "items"], []);
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

export const filterListPromoApi = (listPromo) => {
  let promoListResult = [];
  listPromo.map((listPromoItem) => {
    if (listPromoItem.type === PROMO_NORMAL) {
      listPromoItem.data.map((promo) => {
        promo.typeFilter = PROMO_NORMAL;
        promoListResult.push(promo);
      });
    } else if (listPromoItem.type === PROMO_FLASH_SALE) {
      listPromoItem.data.map((promo) => {
        promo.typeFilter = PROMO_FLASH_SALE;
        promoListResult.push(promo);
      });
    }
  });
  return promoListResult;
};
