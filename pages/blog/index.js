import { useMemo } from "react";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { getListBlog, getSiteServer, getWebsitesConfig, getWebsitesData } from "../../src/services/backend";
import { formatConfig } from "../../src/services/frontend";
import PageContainer from "../../src/containers/pageContainer";
import { chain } from "lodash";

export async function getServerSideProps(ctx) {
  const pathname = ctx.req.headers.host === "localhost:3041" ? "gogi.ggg.systems" : ctx.req.headers.host;
  const webSiteConfig = await getWebsitesConfig(pathname);
  const webSites = await getWebsitesData();
  const webData = chain(webSites)
    .get(["data", "rows"])
    .find((e) => e.code === webSiteConfig.website_code)
    .value();
  const siteCode = webData?.code ?? process.env.SITE_CODE;

  const [{ data }, { data: site }] = await Promise.all([getListBlog(), getSiteServer(siteCode)]);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      blogs: data.data.blogs,
    },
  };
}

const Site = ({ site_code, config, blogs }) => {
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  return (
    <Layout>
      <PageContainer pageName={Pages.blog.name} siteCode={site_code} blogs={blogs} modifiedConfig={modifiedConfig} />
    </Layout>
  );
};

export default Site;
