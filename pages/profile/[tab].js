import { List } from "immutable";
import { map } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API, SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getApiKeyGoogleMap, getSite, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";

// export async function getStaticPaths() {
//   const tabs = ["my-profile", "my-promo", "my-history", "register-promo"];
//   const tabPaths = map(tabs, (tab) => ({
//     params: { tab: tab },
//   }));
//   return {
//     paths: tabPaths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const { tab } = params;
  const [{ data: googleMapApi }, { data: site }] = await Promise.all([
    getApiKeyGoogleMap(),
    getSiteServer(process.env.SITE_CODE),
  ]);
  return {
    props: {
      config: site?.config ?? null,
      site_code: site?.site_code ?? null,
      tab: tab ?? null,
      googleMapApi,
    },
  };
}

const Profile = ({ config, site_code, tab, googleMapApi }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);

  useEffect(() => {
    dispatch({ type: UPDATE_CONFIG, path: ["profile-tab"], value: tab });
    dispatch({ type: SET_GOOGLE_MAP_API, path: ["profile-tab"], value: googleMapApi[0] });
    //   dispatch({
    //     type: UPDATE_CONFIG,
    //     path: ["breadcrumbs"],
    //     value: List([Pages.home, Pages.profile]),
    //   });
  }, [config]);

  return (
    <Layout>
      <PageContainer pageName={Pages.profile.name} siteCode={site_code} modifiedConfig={modifiedConfig} />
    </Layout>
  );
};

export default Profile;
