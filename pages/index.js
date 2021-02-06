import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_PAGE_NAME, SET_SHOW_MENU_HEADER, UPDATE_CONFIG } from "../src/constants";
import Layout from "../src/containers/layout";
import PageContainer from "../src/containers/pageContainer";
import { Pages } from "../src/sections";
import { formatConfig } from "../src/services/frontend";
import { getSite } from "../src/services/backend";

export async function getStaticProps() {
  const site_code = process.env.SITE_CODE;
  const site = await getSite(site_code);
  return {
    props: {
      config: site?.config ?? null,
      site_code: site_code ?? null,
    },
  };
}

const Site = ({ config, site_code }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages.home.name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
  }, [config]);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Site;
