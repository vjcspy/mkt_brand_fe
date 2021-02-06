import { List } from "immutable";
import { map } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { blogs } from "../../src/dummyData/blogs";
import { Pages, RenderFooter, RenderHeader } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSite } from "../../src/services/backend";
import { MainContainer, MainWrapper } from "../../src/styles";
import useFromJS from "../../src/hooks/useFromJS";
import Breadcrumbs from "../../src/sections/breadcrumbs";
import Article from "../../src/sections/article";

export async function getStaticPaths() {
  const menuPaths = map(blogs, (blog) => ({
    params: { article: blog.id },
  }));
  return {
    paths: menuPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const site = await getSite(process.env.SITE_CODE);
  const { article } = params;
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      blog: blogs.find(({ id }) => id === article),
    },
  };
}

const Site = ({ site_code, config, blog }) => {
  const dispatch = useDispatch();
  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages["blog-detail"].name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({
      type: UPDATE_CONFIG,
      path: ["breadcrumbs"],
      value: List([Pages.home, Pages["blog-detail"]]),
    });
  }, []);

  return (
    <Layout>
      <MainContainer>
        <RenderHeader config={header} />
        <MainWrapper className="main-content">
          <Breadcrumbs />
          <Article blog={blog} />
        </MainWrapper>
        <RenderFooter config={footer} />
      </MainContainer>
    </Layout>
  );
};

export default Site;
