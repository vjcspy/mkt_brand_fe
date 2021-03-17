import { List } from "immutable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSite, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps() {
  const { data: site } = await getSiteServer(process.env.SITE_CODE);

  return {
    props: {
      config: site?.config ?? null,
      site_code: site?.site_code ?? null,
    },
  };
}

const Profile = ({ config, site_code }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages.profile.name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    //   dispatch({
    //     type: UPDATE_CONFIG,
    //     path: ["breadcrumbs"],
    //     value: List([Pages.home, Pages.profile]),
    //   });
  }, [config]);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Profile;
