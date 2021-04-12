import path from "path";
import Axios from "axios";
import { each, get, sortBy, chain } from "lodash";
import { PROMO_FLASH_SALE, PROMO_NORMAL } from "../constants";
import fs from "fs";

export const getWebsitesConfig = async (domain) => {
  try {
    const { getWebsitesConfig } = getData();
    if (getWebsitesConfig) {
      return getWebsitesConfig;
    } else {
      const { data } = await Axios.get(process.env.NEXT_PUBLIC_GGG_INTERNAL + "/get-website", { params: { domain } });
      const fileData = getData();
      fileData["getWebsitesConfig"] = data;
      saveData(fileData);
      return data;
    }
  } catch (e) {
    console.log("e:", e);
  }
};

export const getWebsitesData = async () => {
  const { getWebsitesData } = getData();
  if (getWebsitesData) {
    return getWebsitesData;
  } else {
    const { data } = await Axios.post(process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/rest/V1/izretail/dispatch", {
      action: {
        type: "get-websites",
        payload: {},
      },
    });
    const fileData = getData();
    fileData["getWebsitesData"] = data;
    saveData(fileData);
    return data;
  }
};

export const getSiteCode = async (name) => {
  const webSite = await getWebsitesData();
  return chain(webSite)
    .get(["data", "rows"])
    .find((e) => e.code === name)
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
  const { getApiKeyGoogleMap } = getData();
  if (getApiKeyGoogleMap) {
    return getApiKeyGoogleMap;
  } else {
    const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
    const { data } = await Axios.get(`${host}/get-configs`);
    const fileData = getData();
    fileData["getApiKeyGoogleMap"] = data;
    saveData(fileData);
    return data;
  }
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
  rootCategory,
} = {}) => {
  const productFragment = `fragment product on ProductInterface{__typename id name attribute_set_id description{html}gift_message_available image{url}only_x_left_in_stock options_container price_range{maximum_price{discount{amount_off percent_off}final_price{currency value}}minimum_price{discount{amount_off percent_off}final_price{currency value}}}short_description{html}sku stock_status thumbnail{url}url_key}`;
  const bundleProductFragment = `fragment bundle on BundleProduct{items{__typename position required title option_id options{product{...product}}}}`;
  const categoryTreeChild = `fragment categoryTreeChild on CategoryTree{id level name path position url_key}`;
  const categoryTree = `fragment categoryTree on CategoryTree{id level name path position children{...categoryTreeChild}url_key}`;
  const categoryResult = `fragment category on CategoryResult{items{id name position description url_key children_count canonical_url level path children{...categoryTree}}}`;
  const query = `query{categories(filters:{ids:{in:["${rootCategory}"]}}pageSize:${pageSize} currentPage:${currentPage}){...category page_info{total_pages}total_count}}`;

  const { data } = await Axios.post(
    process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql",
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
  const bundleProductFragment = `fragment bundle on BundleProduct{items{__typename type position required title option_id options{product{... on ProductInterface{__typename id name attribute_set_id description{html}gift_message_available image{url}only_x_left_in_stock options_container price_range{maximum_price{discount{amount_off percent_off}final_price{currency value}}minimum_price{discount{amount_off percent_off}final_price{currency value}}}short_description{html}sku stock_status thumbnail{url}url_key}}}}}`;
  const query = `query{catalogCategoryListingData(search:"" filters:{code:"category_id",data:{eq:"${categoryId}"}}pageSize:100 currentPage:1){items{...product ...bundle}page_info{total_pages}total_count}}`;

  const { data } = await Axios.post(
    process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql",
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

export const pickUpVoucher = ({ code, token }) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.post(
    `${host}/pick-up-voucher`,
    {
      promotionId: code,
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
export const getListRestaurant = ({ brandId = 7, provinceId = 5, longitude, latitude }) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.get(`${host}/restaurant`, {
    params: {
      brandId,
      provinceId,
      longitude,
      latitude,
    },
    headers: {
      "tgs-version": "2.6.10",
    },
  });
};
export const getProvinces = async () => {
  const { getProvinces } = getData();
  if (getProvinces) {
    return getProvinces;
  } else {
    const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
    const { data: listProvince } = await Axios.get(`${host}/province`, {
      headers: {
        "tgs-version": "2.6.10",
      },
    });
    const provinces = listProvince.result?.map((item) => ({ id: item?.id, name: item?.name }));
    const fileData = getData();
    fileData["getProvinces"] = provinces;
    saveData(fileData);
    return provinces;
  }
};

export const filterListPromoApi = (listPromo) => {
  let promoListResult = [];
  listPromo?.map((listPromoItem) => {
    if (listPromoItem.type === PROMO_NORMAL) {
      listPromoItem.data?.map((promo) => {
        promo.typeFilter = PROMO_NORMAL;
        promoListResult.push(promo);
      });
    } else if (listPromoItem.type === PROMO_FLASH_SALE) {
      listPromoItem.data?.map((promo) => {
        promo.typeFilter = PROMO_FLASH_SALE;
        promoListResult.push(promo);
      });
    }
  });
  return promoListResult;
};

export const getProvinceIdByLocation = ({ lat, lng }) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.get(`${host}/get-province-id-by-location`, {
    params: {
      longitude: lng,
      latitude: lat,
    },
    headers: {
      "tgs-version": "2.6.10",
    },
  });
};

export const filterProvinceById = (listProvince, id) => {
  return listProvince?.find((item) => item.id === id) ?? null;
};

export const getPromotionByBrandProvince = ({ brandId = 7, provinceId = 5 }) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.get(`${host}/get-promotion-by-brand-province`, {
    params: {
      brandId,
      provinceId,
    },
    headers: {
      "tgs-version": "2.6.10",
    },
  });
};

// read file cache
export const getData = () => {
  let data = {};
  try {
    const dataFilePath = path.join(process.cwd(), "data.json");
    data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  } catch (e) {
    console.log(e);
  }
  return data;
};
// write file cache
export const saveData = (data) => {
  try {
    const dataFilePath = path.join(process.cwd(), "data.json");
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const createOrUpdateBrandStory = async (brandStory, token) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;

  if (brandStory.id) {
    return Axios.put(`${host}/brand-stories/${brandStory.id}`, brandStory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return Axios.post(`${host}/brand-stories`, brandStory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export const deleteStory = (id) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  return Axios.delete(`${host}/brand-stories/${id}`);
};

export const getListBrandStory = () => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  return Axios.get(`${host}/brand-stories`);
};

export const getBrandStoryBySlug = async (slug, brandId) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  return Axios.post(`${host}/graphql`, {
    query: `query {
      brandStories (where: {slug:"${slug}", brandId:"${brandId}"}){
          content
        }
      }`,
  });
};
