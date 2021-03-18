import { List } from "immutable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API, SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSite, getSiteServer, getApiKeyGoogleMap } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps() {
  const site_code = process.env.SITE_CODE;
  const [{ data: googleMapApi }, { data: site }] = await Promise.all([getApiKeyGoogleMap(), getSiteServer(site_code)]);
  return {
    props: {
      config: site?.config ?? null,
      site_code: site?.site_code ?? null,
      googleMapApi: googleMapApi[0],
    },
  };
}

const Map = ({ config, site_code, googleMapApi }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_GOOGLE_MAP_API, value: googleMapApi });
    dispatch({ type: SET_PAGE_NAME, value: Pages.map.name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    // dispatch({
    //   type: UPDATE_CONFIG,
    //   path: ["breadcrumbs"],
    //   value: List([Pages.home, Pages.map]),
    // });
  }, [config]);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Map;
