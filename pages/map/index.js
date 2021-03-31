import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import {
  getApiKeyGoogleMap,
  getListRestaurant,
  getSiteCode,
  getSiteServer,
  getWebsitesConfig,
} from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps(ctx) {
  try {
    const { idRestaurant } = ctx.query;
    const site_code = process.env.SITE_CODE;

    const pathname = ctx.req.headers.host === "localhost:3041" ? "gogi.ggg.systems" : ctx.req.headers.host;
    const {
      data: { website_code },
    } = await getWebsitesConfig(pathname);
    const { id: brandId } = await getSiteCode(website_code);
    const [{ data: googleMapApi }, { data: site }, { data: dataForMap }] = await Promise.all([
      getApiKeyGoogleMap(),
      getSiteServer(site_code),
      getListRestaurant({ brandId }),
    ]);

    let restaurantViewMap = idRestaurant ? dataForMap.result?.find((item) => item.code == idRestaurant) ?? null : null;
    return {
      props: {
        brandId: brandId ?? null,
        config: site?.config ?? null,
        site_code: site?.site_code ?? null,
        googleMapApi: googleMapApi[0],
        restaurantViewMap,
        listRestaurant: dataForMap.result,
      },
    };
  } catch (e) {
    return {
      props: {
        brandId: null,
        config: null,
        site_code: null,
        googleMapApi: null,
        restaurantViewMap: null,
        listRestaurant: null,
      },
    };
  }
}

const Map = ({ config, site_code, googleMapApi, restaurantViewMap, listRestaurant, brandId }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  useEffect(() => {
    dispatch({ type: SET_GOOGLE_MAP_API, value: googleMapApi });
    // dispatch({
    //   type: UPDATE_CONFIG,
    //   path: ["breadcrumbs"],
    //   value: List([Pages.home, Pages.map]),
    // });
  }, [config]);

  return (
    <Layout>
      <PageContainer
        restaurantViewMap={restaurantViewMap}
        listRestaurant={listRestaurant}
        pageName={Pages.map.name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
        brandId={brandId}
      />
    </Layout>
  );
};

export default Map;
