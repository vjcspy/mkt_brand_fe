import { List } from "immutable";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API, SET_ICON_VIEW_MAP } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { filterListPromoApi, getApiKeyGoogleMap, getListPromo, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";
import { get } from "lodash";

export async function getServerSideProps({}) {
  const site_code = process.env.SITE_CODE;
  try {
    const [{ data: googleMapApi }, { data: promoListApi }, { data: site }] = await Promise.all([
      getApiKeyGoogleMap(),
      getListPromo(),
      getSiteServer(site_code),
    ]);

    let promoListResult = filterListPromoApi(promoListApi.result)

    return {
      props: {
        config: site?.config ?? null,
        site_code: site?.site_code ?? null,
        promoListApi: promoListResult ?? [],
        googleMapApi: googleMapApi[0],
      },
    };
  } catch (e) {
    return {
      props: {
        config: null,
        site_code: null,
        promoListApi: [],
      },
    };
  }
}

const Promo = ({ config, site_code, promoListApi, googleMapApi }) => {
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
      />
    </Layout>
  );
};

export default Promo;
