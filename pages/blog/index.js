import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GET_BLOGS_BY_IS_SHOW,
  SET_LIST_BLOG_IS_SHOW,
  SET_LIST_PROMO_ACTIVE,
  SET_MODIFIED_CONFIG,
  SET_PAGE_NAME,
  UPDATE_CONFIG,
} from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { getBlogIsShow, getPromoActive, getSection, getSite, getSiteServer } from "../../src/services/backend";
import { menus } from "../../src/dummyData/menus";
import { formatConfig } from "../../src/services/frontend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps() {
  // const site = await getSite(process.env.SITE_CODE);
  const [{ data }, { data: site }] = await Promise.all([getBlogIsShow(), getSiteServer(process.env.SITE_CODE)]);
  const sectionPromo = getSection(site, "home", "promoBanner");
  const listPromoActive = getPromoActive(sectionPromo);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      menus: menus,
      blogs: data.data.blogs,
      listPromoActive: listPromoActive,
    },
  };
}

const Site = ({ site_code, config, blogs, listPromoActive }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages.blog.name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({ type: SET_LIST_BLOG_IS_SHOW, value: blogs });
    dispatch({ type: SET_LIST_PROMO_ACTIVE, value: listPromoActive });
    // dispatch({
    //   type: UPDATE_CONFIG,
    //   path: ["breadcrumbs"],
    //   value: List([Pages.home, Pages.blog]),
    // });
  }, [config]);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Site;
