import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getApiKeyGoogleMap, getInitialData, getListRestaurant, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps(ctx) {
  try {
    const { siteCode, brand_id } = await getInitialData(ctx);
    const { idRestaurant } = ctx.query;
    const [googleMapApi, { data: site }, { data: dataForMap }] = await Promise.all([
      getApiKeyGoogleMap(),
      getSiteServer(siteCode),
      getListRestaurant({ brand_id }),
    ]);
    let restaurantViewMap = idRestaurant ? dataForMap.result?.find((item) => item.code == idRestaurant) ?? null : null;
    return {
      props: {
        brandId: brand_id ?? null,
        config: site?.config ?? null,
        site_code: site?.site_code ?? null,
        googleMapApi: googleMapApi ?? null,
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
