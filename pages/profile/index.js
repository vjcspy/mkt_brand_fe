import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API, SET_SHOW_MENU_HEADER } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getApiKeyGoogleMap, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps() {
  const site_code = process.env.SITE_CODE;
  const [{ data: googleMapApi }, { data: site }] = await Promise.all([getApiKeyGoogleMap(), getSiteServer(site_code)]);
  return {
    props: {
      config: site?.config ?? null,
      site_code: site?.site_code ?? null,
      googleMapApi,
    },
  };
}

const Profile = ({ config, site_code, googleMapApi }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  useEffect(() => {
    dispatch({ type: SET_GOOGLE_MAP_API, value: googleMapApi });
    dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    return () => dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
  }, [config]);
  return (
    <Layout>
      <PageContainer pageName={Pages.profile.name} sideCode={site_code} modifiedConfig={modifiedConfig} />
    </Layout>
  );
};

export default Profile;
