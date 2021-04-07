import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_GOOGLE_MAP_API, SET_SHOW_MENU_HEADER } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getApiKeyGoogleMap, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";
import { useRouter } from "next/dist/client/router";

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
  const tokenUser = useSelector((state) => state.get("tokenUser")).toJS();
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  const router = useRouter();
  useEffect(() => {
    dispatch({ type: SET_GOOGLE_MAP_API, value: googleMapApi });
    dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    return () => dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
  }, [config]);

  useEffect(() => {
    if (!tokenUser.token) {
      router.push("/");
    }
  }, []);
  return (
    <Layout>
      <PageContainer pageName={Pages.profile.name} sideCode={site_code} modifiedConfig={modifiedConfig} />
    </Layout>
  );
};

export default Profile;
