import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getApiKeyGoogleMap, getListPromo, getListRestaurant, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";
import Head from "next/head";

export async function getServerSideProps({ query }) {
  try {
    const { idRestaurant } = query;
    const site_code = process.env.SITE_CODE;
    const [{ data: googleMapApi }, { data: site }, { data: dataForMap }] = await Promise.all([
      getApiKeyGoogleMap(),
      getSiteServer(site_code),
      getListRestaurant({ brandId: 7, provinceId: 5 }),
    ]);
    let restaurantViewMap = idRestaurant ? dataForMap.result?.find((item) => item.code === idRestaurant) ?? {} : null;

    return {
      props: {
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
        config: null,
        site_code: null,
        googleMapApi: null,
        restaurantViewMap: null,
        listRestaurant: null,
      },
    };
  }
}

const Map = ({ config, site_code, googleMapApi, restaurantViewMap, listRestaurant }) => {
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
        promoViewMap={restaurantViewMap}
        listRestaurant={listRestaurant}
        pageName={Pages.map.name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
      />
    </Layout>
  );
};

export default Map;
