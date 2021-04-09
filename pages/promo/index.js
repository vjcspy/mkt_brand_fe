import { List } from "immutable";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { GET_PROMO_OF_USER, SET_GOOGLE_MAP_API, SET_ICON_VIEW_MAP } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import {
  filterListPromoApi,
  getApiKeyGoogleMap,
  getListPromo,
  getSiteCode,
  getSiteServer,
  getWebsitesConfig,
  getPromotionByBrandProvince,
  getWebsitesData,
} from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";
import { chain, get } from "lodash";

export async function getServerSideProps(ctx) {
  try {
    const pathname = ctx.req.headers.host === "localhost:3041" ? "gogi.ggg.systems" : ctx.req.headers.host;
    const webSiteConfig = await getWebsitesConfig(pathname);
    const webSites = await getWebsitesData();
    const webData = chain(webSites)
      .get(["data", "rows"])
      .find((e) => e.code === webSiteConfig.website_code)
      .value();
    const siteCode = webData?.code ?? process.env.SITE_CODE;
    const { brand_id } = webData;

    const [{ data: googleMapApi }, { data: promoListApi }, { data: site }] = await Promise.all([
      getApiKeyGoogleMap(),
      getPromotionByBrandProvince({ brand_id }),
      getSiteServer(siteCode),
    ]);

    let promoListResult = filterListPromoApi(promoListApi.result.content);

    return {
      props: {
        config: site?.config ?? null,
        site_code: site?.site_code ?? null,
        promoListApi: promoListResult ?? [],
        googleMapApi: googleMapApi[0],
        brandId: brand_id ?? null,
      },
    };
  } catch (e) {
    console.log("error: ", e);
    return {
      props: {
        config: null,
        site_code: null,
        promoListApi: [],
        brandId: null,
      },
    };
  }
}

const Promo = ({ config, site_code, promoListApi, googleMapApi, brandId }) => {
  const dispatch = useDispatch();
  const iconMap = get(config, ["pages", "map", "sections", 0, "components", "imageMarker", "value"]);
  useEffect(() => {
    dispatch({ type: SET_GOOGLE_MAP_API, value: googleMapApi });
    dispatch({ type: SET_ICON_VIEW_MAP, value: iconMap });
    dispatch({ type: GET_PROMO_OF_USER, value: { type: "all" } });
  }, [config]);
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  return (
    <Layout>
      <PageContainer
        promoListApi={promoListApi}
        pageName={Pages.promo.name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
        brandId={brandId}
      />
    </Layout>
  );
};

export default Promo;
