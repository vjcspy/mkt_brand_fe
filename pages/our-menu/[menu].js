import { List } from "immutable";
import { map } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_OUR_MENUS, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import PageContainer from "../../src/containers/pageContainer";
import { menus } from "../../src/dummyData/menus";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSite } from "../../src/services/backend";

export async function getStaticPaths() {
  const menuPaths = map(menus, (menu) => ({
    params: { menu: menu.slug },
  }));
  return {
    paths: menuPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const site = await getSite(process.env.SITE_CODE);
  const { menu } = params;
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      menus: menus,
      menu: menu,
    },
  };
}

const Site = ({ site_code, config, menus, menu }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_OUR_MENUS, value: menus });
    dispatch({ type: SET_PAGE_NAME, value: Pages["our-menu-detail"].name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({ type: UPDATE_CONFIG, path: ["menu-slug"], value: menu });
    let menuName = menus.find((m) => m.slug === menu)?.name ?? "";
    dispatch({
      type: UPDATE_CONFIG,
      path: ["breadcrumbs"],
      value: List([
        Pages.home,
        Pages["our-menu"],
        {
          ...Pages["our-menu-detail"],
          path: "/our-menu/" + menu,
          title: menuName,
        },
      ]),
    });
  }, []);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Site;
