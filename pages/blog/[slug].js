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
import { getInitialData, getSiteServer, getSlug } from "../../src/services/backend";
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
  const { siteCode } = await getInitialData(ctx);

  const { slug } = ctx.params;
  const [{ data: site }, { data }] = await Promise.all([getSiteServer(siteCode), getSlug(slug)]);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      blog: data.data?.blogs?.[0] ?? null,
    },
  };
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fonWeight: 400,
};
const Site = ({ site_code, config, blog }) => {
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);

  return blog ? (
    <Layout>
      <PageContainer
        pageName={Pages["blog-detail"].name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
        blog={blog}
      />
    </Layout>
  ) : (
    <div style={style}>404-Page not found</div>
  );
};

export default Site;
