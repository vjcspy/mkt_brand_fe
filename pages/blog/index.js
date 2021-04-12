import { useMemo } from "react";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { getInitialData, getListBlog, getSiteServer } from "../../src/services/backend";
import { formatConfig } from "../../src/services/frontend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps(ctx) {
  const { siteCode } = await getInitialData(ctx);
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
