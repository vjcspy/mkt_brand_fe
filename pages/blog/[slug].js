import { List } from "immutable";
import { chain, map } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  SET_BLOG_SLUG,
  SET_LIST_PROMO_ACTIVE,
  SET_MODIFIED_CONFIG,
  SET_PAGE_NAME,
  UPDATE_CONFIG,
} from "../../src/constants";
import Layout from "../../src/containers/layout";
import { blogs } from "../../src/dummyData/blogs";
import { Pages, RenderFooter, RenderHeader } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import {
  getListBlog,
  getSite,
  getSiteServer,
  getSlug,
  getWebsitesConfig,
  getWebsitesData,
} from "../../src/services/backend";
import { MainContainer, MainWrapper } from "../../src/styles";
import PageContainer from "../../src/containers/pageContainer";

// export async function getStaticPaths() {
//   const { data } = await getListBlog();
//   const { blogs } = data.data;

//   const paths = blogs.map((blog) => ({
//     params: { slug: blog.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const site = await getSite(process.env.SITE_CODE);
//   const { data } = await getSlug(slug);
//   return {
//     props: {
//       site_code: site?.site_code ?? null,
//       config: site?.config ?? null,
//       blog: data.data.blogs[0],
//     },
//   };
// }

export const getServerSideProps = async (ctx) => {
  const pathname = ctx.req.headers.host;
  const webSiteConfig = await getWebsitesConfig(pathname);
  const webSites = await getWebsitesData();
  const webData = chain(webSites)
    .get(["data", "rows"])
    .find((e) => e.code === webSiteConfig.website_code)
    .value();
  const siteCode = webData?.code ?? process.env.SITE_CODE;

  const { slug } = ctx.params;
  const [{ data: site }, { data }] = await Promise.all([getSiteServer(siteCode), getSlug(slug)]);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      blog: data.data.blogs[0],
    },
  };
};

const Site = ({ site_code, config, blog }) => {
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);

  return (
    <Layout>
      <PageContainer
        pageName={Pages["blog-detail"].name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
        blog={blog}
      />
    </Layout>
  );
};

export default Site;
