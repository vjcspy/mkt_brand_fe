import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  SET_SHOW_MENU_HEADER,
} from "../src/constants";
import Layout from "../src/containers/layout";
import PageContainer from "../src/containers/pageContainer";
import { Pages } from "../src/sections";
import { formatConfig } from "../src/services/frontend";
import { getSiteServer } from "../src/services/backend";

export async function getServerSideProps() {
  const site_code = process.env.SITE_CODE;
  const { data: site } = await getSiteServer(site_code);
  return {
    props: {
      config: site?.config ?? null,
      site_code: site_code ?? null,
    },
  };
}

const Site = ({ config, site_code }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  useEffect(() => {
    dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
    return () => {
      dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    };
  }, [config]);

  return (
    <Layout>
      <PageContainer
        siteCode={site_code}
        pageName={Pages.home.name}
        modifiedConfig={modifiedConfig}
        shouldHideFooter={true}
      />
    </Layout>
  );
};

export default Site;
