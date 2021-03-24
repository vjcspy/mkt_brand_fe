import { useMemo } from "react";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { getListBlog, getSiteServer } from "../../src/services/backend";
import { formatConfig } from "../../src/services/frontend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps() {
  const [{ data }, { data: site }] = await Promise.all([getListBlog(), getSiteServer(process.env.SITE_CODE)]);
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
