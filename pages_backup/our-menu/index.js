import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  SET_SHOW_MENU_HEADER,
} from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { getSiteServer } from "../../src/services/backend";
import { formatConfig } from "../../src/services/frontend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps({}) {
  const { data: site } = await getSiteServer(process.env.SITE_CODE);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
    },
  };
}

const Site = ({ site_code, config, menus }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  useEffect(() => {
    dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
    // dispatch({
    //   type: UPDATE_CONFIG,
    //   path: ["breadcrumbs"],
    //   value: List([Pages.home, Pages["our-menu"]]),
    // });
  }, [config]);

  return (
    <Layout>
      <PageContainer
        siteCode={site_code}
        menus={menus}
        pageName={Pages["our-menu"].name}
        modifiedConfig={modifiedConfig}
      />
    </Layout>
  );
};

export default Site;
