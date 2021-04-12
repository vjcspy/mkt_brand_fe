import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSiteServer, getWebsitesConfig, getWebsitesData } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";
import { chain } from "lodash";

export async function getServerSideProps(ctx) {
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
      site_code: site?.site_code ?? null,
    },
  };
}

const PolicyCookie = ({ config, site_code }) => {
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);

  return (
    <Layout>
      <PageContainer pageName={Pages["policy-cookie"].name} siteCode={site_code} modifiedConfig={modifiedConfig} />
    </Layout>
  );
};

export default PolicyCookie;
