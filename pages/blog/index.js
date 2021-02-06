import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages, RenderFooter, RenderHeader } from "../../src/sections";
import { getSite } from "../../src/services/backend";
import { menus } from "../../src/dummyData/menus";
import { List } from "immutable";
import { formatConfig } from "../../src/services/frontend";
import useFromJS from "../../src/hooks/useFromJS";
import { MainContainer, MainWrapper } from "../../src/styles";
import ListBlog from "../../src/sections/listBlog";
import Breadcrumbs from "../../src/sections/breadcrumbs";

export async function getStaticProps() {
  const site = await getSite(process.env.SITE_CODE);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      menus: menus,
    },
  };
}

const Site = ({ site_code, config }) => {
  const dispatch = useDispatch();

  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages.blog.name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({
      type: UPDATE_CONFIG,
      path: ["breadcrumbs"],
      value: List([Pages.home, Pages.blog]),
    });
  }, []);

  return (
    <Layout>
      <MainContainer>
        <RenderHeader config={header} />
        <MainWrapper className="main-content">
          <Breadcrumbs />
          <ListBlog />
        </MainWrapper>
        <RenderFooter config={footer} />
      </MainContainer>
    </Layout>
  );
};

export default Site;
