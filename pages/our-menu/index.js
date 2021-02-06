import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_OUR_MENUS, SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import PageContainer from "../../src/containers/pageContainer";
import { Pages } from "../../src/sections";
import { getSite } from "../../src/services/backend";
import { menus } from "../../src/dummyData/menus";
import { List } from "immutable";
import { formatConfig } from "../../src/services/frontend";

export async function getStaticProps({ params }) {
  const site = await getSite(process.env.SITE_CODE);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      menus: menus,
    },
  };
}

const Site = ({ site_code, config, menus }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_OUR_MENUS, value: menus });
    dispatch({ type: SET_PAGE_NAME, value: Pages["our-menu"].name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({
      type: UPDATE_CONFIG,
      path: ["breadcrumbs"],
      value: List([Pages.home, Pages["our-menu"]]),
    });
  }, []);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Site;
