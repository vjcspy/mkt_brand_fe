import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { GET_PROMO_OF_USER, SET_GOOGLE_MAP_API, SET_ICON_VIEW_MAP } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import {
  filterListPromoApi,
  getApiKeyGoogleMap,
  getSiteServer,
  getPromotionByBrandProvince,
  getInitialData,
} from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";
import { chain, get } from "lodash";

export async function getServerSideProps(ctx) {
  try {
    const { siteCode, brand_id } = await getInitialData(ctx);
    const [googleMapApi, { data: promoListApi }, { data: site }] = await Promise.all([
      getApiKeyGoogleMap(),
      getPromotionByBrandProvince({ brand_id }),
      getSiteServer(siteCode),
    ]);

    let promoListResult = filterListPromoApi(promoListApi.result.content);
    console.log("googleMapApi:", googleMapApi);
    return {
      props: {
        config: site?.config ?? null,
        site_code: site?.site_code ?? null,
        promoListApi: promoListResult ?? [],
        googleMapApi: googleMapApi[0] ?? null,
        brandId: brand_id ?? null,
      },
    };
  } catch (e) {
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
