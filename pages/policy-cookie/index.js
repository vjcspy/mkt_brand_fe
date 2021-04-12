import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getInitialData, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps(ctx) {
  const { siteCode } = getInitialData(ctx);
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
