import { List } from "immutable";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API, SET_ICON_VIEW_MAP } from "../../src/constants";
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
} from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";
import { get } from "lodash";

export async function getServerSideProps(ctx) {
  try {
    const site_code = process.env.SITE_CODE;
    const pathname = ctx.req.headers.host === "localhost:3041" ? "gogi.ggg.systems" : ctx.req.headers.host;
    const { website_code } = await getWebsitesConfig(pathname);
    const { id: brandId } = await getSiteCode(website_code);

    const [{ data: googleMapApi }, { data: promoListApi }, { data: site }] = await Promise.all([
      getApiKeyGoogleMap(),
      getPromotionByBrandProvince({ brandId }),
      getSiteServer(site_code),
    ]);

    let promoListResult = filterListPromoApi(promoListApi.result.content);

    return {
      props: {
        config: site?.config ?? null,
        site_code: site?.site_code ?? null,
        promoListApi: promoListResult ?? [],
        googleMapApi: googleMapApi[0],
        brandId: brandId ?? null,
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
