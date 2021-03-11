import { List } from "immutable";
import { map } from "lodash";
import { useEffect } from "react";
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
import { getBlogIsShow, getSite, getSiteServer, getSlug } from "../../src/services/backend";
import { MainContainer, MainWrapper } from "../../src/styles";
import PageContainer from "../../src/containers/pageContainer";

// export async function getStaticPaths() {
//   const { data } = await getBlogIsShow();
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

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const [site, { data }] = await Promise.all([getSiteServer(process.env.SITE_CODE), getSlug(slug)]);
  const sectionPromo = getSection(site, "home", "promoBanner");
  const listPromoActive = getPromoActive(sectionPromo);
  // const site = await getSite(process.env.SITE_CODE);
  // const { data } = await getSlug(slug);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      blog: data.data.blogs[0],
      listPromoActive,
    },
  };
};

const Site = ({ site_code, config, blog, listPromoActive }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages["blog-detail"].name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({ type: SET_BLOG_SLUG, value: blog });
    dispatch({ type: SET_LIST_PROMO_ACTIVE, value: listPromoActive });
  }, [config]);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Site;
