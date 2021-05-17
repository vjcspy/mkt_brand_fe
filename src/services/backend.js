import path from "path";
import Axios from "axios";
import { each, get, sortBy, chain } from "lodash";
import { PROMO_FLASH_SALE, PROMO_NORMAL } from "../constants";
import fs from "fs";
import { CacheFile } from "./cache";

export const getInitialData = async (ctx) => {
  const pathname = ctx.req.headers.host;

  const CACHE_KEY = "INIT_DATA_FOR_DOMAIN_" + pathname;
  const cachedData = await CacheFile.get(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }

  const [webSiteConfig, webSites] = await Promise.all([getWebsitesConfig(pathname), getWebsitesData()]);
  const webData = chain(webSites)
    .get(["data", "rows"])
    .find((e) => e.code === webSiteConfig?.website_code)
    .value();

  if (!webData) {
    throw new Error("Không tìm thấy dữ liệu website ở pcms cho domain hiện tại. Kiểm tra api config domain và pcms cho: " + pathname);
  }

  const { brand_id } = webData ?? {};
  if (!brand_id) {
    throw new Error("Không có dữ liệu brand trong website trên pcms");
  }

  const group = webData?.groups?.find((g, index) =>
    webData?.default_group_id ? g.id === webData?.default_group_id : index == 0
  );
  const { root_category_id } = group ?? {};

  const store = group?.stores?.find((s, index) =>
    group?.default_store_id ? s.id === group.default_store_id : index === 0
  );

  const siteCode = webData?.code;
  const storeCode = store?.code;
  if (siteCode && storeCode && root_category_id && brand_id) {

    const data = {
      siteCode,
      storeCode,
      root_category_id,
      brand_id
    };
    await CacheFile.save(CACHE_KEY, data);
    return data;
  } else {
    throw new Error("siteCode or storeCode or root_category_id or brand_id null");
  }
};

export const getWebsitesConfig = async (domain) => {
  const CACHE_KEY = "WEBSITE_DATA_BY_DOMAIN_FROM_API_" + domain;
  const cachedData = await CacheFile.get(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await Axios.get(process.env.NEXT_PUBLIC_GGG_INTERNAL + "/get-website", { params: { domain } });
    if (data) {
      await CacheFile.save(CACHE_KEY, data);
      return data;
    } else {
      throw new Error("Could not get website data from api for domain" + domain);
    }
  } catch (e) {
    console.log("Could not get WebsiteConfig data", e);
  }
  return undefined;
};

export const getWebsitesData = async () => {
  const CACHE_KEY = "WEB_SITE_DATA_FROM_PCMS";
  const cachedData = await CacheFile.get(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await Axios.post(process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/rest/V1/izretail/dispatch", {
      action: {
        type: "get-websites",
        payload: {}
      }
    });
    if (data) {
      await CacheFile.save(CACHE_KEY, data);
      return data;
    } else {
      throw new Error("Could not get website data from PCMS");
    }
  } catch (e) {
    console.log("Could not get Website data from PCMS", e);
  }

  return undefined;
};

export const getGlobalToken = async () => {
  global.jwtToken;
  if (!global.jwtToken) {
    const host = process.env.API_HOST;
    let {
      data: { jwt }
    } = await Axios.post(`${host}/auth/local`, {
      identifier: process.env.NEXTJS_USERNAME,
      password: process.env.NEXTJS_PASSWORD
    });
    global.jwtToken = jwt;
  }
  return global.jwtToken;
};

export const getGlobalSites = async () => {
  console.log("herer____");
  const postsDirectory = path.join(process.cwd(), "data.json");
  const data = JSON.parse(fs.readFileSync(postsDirectory, "utf-8"));
  return data;
};

export const getSitePaths = async () => {
  const sites = await getGlobalSites();
  return sites.map((s) => ({
    params: {
      site: s.site_code
    }
  }));
};

export const getSite = async (site_code) => {
  const sites = await getGlobalSites();
  return sites.find((site) => site.site_code === site_code);
};

export const getSiteServer = async (site_code) => {
  const CACHE_KEY = "STRAPI_SITE_DATA_" + site_code;
  const cachedData = await CacheFile.get(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }
  const host = process.env.NEXT_PUBLIC_API_HOST;
  try {
    const { data } = await Axios.get(`${host}/sites/config/${site_code}`);
    await CacheFile.save(CACHE_KEY, { data });
    return { data };
  } catch (e) {
    console.error("Could not get data from STRAPI ", e);
  }
};

export const getApiKeyGoogleMap = async () => {
  const { getApiKeyGoogleMap } = getData();
  if (getApiKeyGoogleMap) {
    return getApiKeyGoogleMap;
  } else {
    const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
    const { data } = await Axios.get(`${host}/get-configs`);
    const fileData = getData();
    fileData["getApiKeyGoogleMap"] = data?.[0];
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
        
      }`
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
      }`
  });
};

export const fetchMenuCategories = async ({
                                            pageSize = 20,
                                            currentPage = 1,
                                            storeCode,
                                            rootCategory
                                          } = {}) => {
  const CACHE_KEY = "MENU_DATA_FOR_STORE" + storeCode;
  const cachedData = await CacheFile.get(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }

  const menu = await fetchParentMenu({
    pageSize,
    currentPage,
    storeCode,
    rootCategory
  });
  const categoriesIds = [];
  menu?.children.forEach(({ id, children }) => {
    categoriesIds.push(id);
    children?.forEach(({ id }) => {
      categoriesIds.push(id);
    });
  });

  const productList = await Promise.all(
    categoriesIds.map((id) => fetchMenuCategoriesListingData({ categoryId: id, storeCode }))
  );
  const categories = categoriesIds.map((id, i) => ({ id, products: productList[i] }));

  const menus = menu?.children.map((category, i) => {
    if (category?.children?.length) {
      category?.children.map((category) =>
        Object.assign(category, { products: categories.find((c) => c.id === category.id).products })
      );
    }
    const products = categories.find((c) => c.id === category.id).products;
    if (get(products, [0, "__typename"]) === "BundleProduct") {
      category.isBundle = true;
    }
    return Object.assign(category, { products });
  });

  await CacheFile.save(CACHE_KEY, menus);

  return menus;
};

export const fetchParentMenu = async ({ pageSize = 20, currentPage = 1, storeCode, rootCategory }) => {
  const categoryTreeChild = `fragment categoryTreeChild on CategoryTree{id level name path position url_key}`;
  const categoryTree = `fragment categoryTree on CategoryTree{id level name path position children{...categoryTreeChild}url_key}`;
  const categoryResult = `fragment category on CategoryResult{items{id name position description url_key children_count canonical_url level path children{...categoryTree}}}`;
  const query = `query{categories(filters:{ids:{in:["${rootCategory}"]}}pageSize:${pageSize} currentPage:${currentPage}){...category page_info{total_pages}total_count}}`;

  if (_.isString(storeCode)) {
    throw new Error("Missing data storeCode");
  }

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
  return menu;
};

export const fetchMenuCategoriesListingData = async ({ categoryId, storeCode }) => {
  const productFragment = `fragment product on ProductInterface{__typename id name attribute_set_id description{html}gift_message_available image{url} options_container price_range{maximum_price{discount{amount_off percent_off}final_price{currency value}}minimum_price{discount{amount_off percent_off}final_price{currency value}}}short_description{html} thumbnail{url}url_key}`;
  const bundleProductFragment = `fragment bundle on BundleProduct{items{__typename type position required title option_id options{product{... on ProductInterface{__typename id name attribute_set_id description{html}gift_message_available image{url} options_container price_range{maximum_price{discount{amount_off percent_off}final_price{currency value}}minimum_price{discount{amount_off percent_off}final_price{currency value}}}short_description{html}sku thumbnail{url}url_key}}}}}`;
  const query = `query{catalogCategoryListingData(search:"" filters:{code:"category_id",data:{eq:"${categoryId}"}}pageSize:100 currentPage:1){items{...product ...bundle}page_info{total_pages}total_count}}`;

  if (_.isString(storeCode)) {
    throw new Error("Missing data storeCode");
  }

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
      provinceId
    },
    headers: {
      "tgs-version": "2.6.10"
    }
  });
};

// pickUpVoucher

export const pickUpVoucher = ({ code, token }) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.post(
    `${host}/pick-up-voucher`,
    {
      promotionId: code
    },
    {
      headers: {
        "tgs-version": "2.6.10",
        Authorization: `Bearer ${token}`
      }
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
      latitude
    },
    headers: {
      "tgs-version": "2.6.10"
    }
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
        "tgs-version": "2.6.10"
      }
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
      latitude: lat
    },
    headers: {
      "tgs-version": "2.6.10"
    }
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
      provinceId
    },
    headers: {
      "tgs-version": "2.6.10"
    }
  });
};
export const getListDynamicBlock = async () => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  return Axios.get(`${host}/dynamic-blocks`);
};

export const getSites = async () => {
  const host = process.env.NEXT_PUBLIC_API_HOST;

  return Axios.post(`${host}/graphql`, {
    query: `query {
      sites{
      id
      site_code
    }
  }`
  });
};

export const pushDynamicBlock = async (data, token) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  if (data.id) {
    return Axios.put(
      `${host}/dynamic-blocks/${data.id}`,
      {
        title: data.title,
        contentVN: data.contentVN,
        contentEN: data.contentEN,
        siteCode: data.siteCode
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } else {
    return Axios.post(
      `${host}/dynamic-blocks`,
      {
        title: data.title,
        contentVN: data.contentVN,
        contentEN: data.contentEN
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
};
// read file cache
export const getData = () => {
  let data = {};
  try {
    const dataFilePath = path.join(process.cwd(), "data.json");
    data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  } catch (e) {
  }
  return data;
};
// write file cache
export const saveData = (data) => {
  try {
    const dataFilePath = path.join(process.cwd(), "data.json");
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
  } catch (e) {
  }
};

export const createOrUpdateBrandStory = async (brandStory, token) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;

  if (brandStory.id) {
    return Axios.put(`${host}/brand-stories/${brandStory.id}`, brandStory, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    return Axios.post(`${host}/brand-stories`, brandStory, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export const deleteBlock = async (idBock, token) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  return Axios.delete(`${host}/dynamic-blocks/${idBock}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteStory = (id, token) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  return Axios.delete(`${host}/brand-stories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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
      }`
  });
};

export const savePickUpVoucher = async ({
                                          timeline,
                                          fullName,
                                          phoneNumber,
                                          eVoucherCode,
                                          platform,
                                          placement,
                                          memo,
                                          content,
                                          location,
                                          brand
                                        }) => {
  const host = process.env.NEXT_PUBLIC_GGG_INTERNAL;
  return Axios.post(`${host}/save-pick-up-voucher-data`, {
    timeline,
    fullName,
    phoneNumber,
    eVoucherCode,
    newUser: false,
    platform,
    placement,
    memo,
    content,
    location,
    brand
  });
};
