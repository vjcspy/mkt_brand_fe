import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_SHOW_MENU_HEADER } from "../src/constants";
import Layout from "../src/containers/layout";
import PageContainer from "../src/containers/pageContainer";
import { Pages } from "../src/sections";
import { formatConfig } from "../src/services/frontend";
import { getSiteServer, getWebsitesConfig, getWebsitesData } from "../src/services/backend";
import { chain } from "lodash";

export async function getServerSideProps(ctx) {
  try {
    const pathname = ctx.req.headers.host;
    const webSiteConfig = await getWebsitesConfig(pathname);
    const webSites = await getWebsitesData();
    const webData = chain(webSites)
      .get(["data", "rows"])
      .find((e) => e.code === webSiteConfig.website_code)
      .value();
    const siteCode = webData?.code ?? process.env.SITE_CODE;
    const { data: site } = await getSiteServer(siteCode);
    return {
      props: {
        config: site?.config ?? null,
        site_code: siteCode ?? null,
      },
    };
  } catch (e) {
    return {
      props: {
        config: null,
        site_code: null,
      },
    };
  }
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
