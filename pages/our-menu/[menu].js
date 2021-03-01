import { List } from "immutable";
import { each, get, isArray, map, sortBy } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_OUR_MENUS, SET_PAGE_NAME, SET_SHOW_MENU_HEADER, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSite } from "../../src/services/backend";
import useSiteRouter from "../../src/hooks/useSiteRouter";
import PageContainer from "../../src/containers/pageContainer";

export async function getStaticPaths() {
  const site = await getSite(process.env.SITE_CODE);
  const menus = get(site, ["menu", "children"], []);
  const menuPaths = map(menus, (menu) => ({
    params: { menu: menu.url_key, menus },
  }));
  return {
    paths: menuPaths,
    fallback: false,
  };
}

export async function getStaticProps({}) {
  const site = await getSite(process.env.SITE_CODE);
  const menus = get(site, ["menu", "children"], []);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      menus: menus,
    },
  };
}

const Site = ({ site_code, config, menus }) => {
  const {
    query: { menu },
  } = useSiteRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: SET_OUR_MENUS, value: menus });
    dispatch({ type: SET_PAGE_NAME, value: Pages["our-menu-detail"].name });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({
      type: UPDATE_CONFIG,
      path: ["breadcrumbs"],
      value: List([Pages.home, Pages["our-menu"]]),
    });
    dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    return () => dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
  }, [config]);

  useEffect(() => {
    dispatch({ type: UPDATE_CONFIG, path: ["menu-slug"], value: menu });

    let menuName = menus.find((m) => m.url_key === menu)?.name ?? "";
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
  }, [menu]);

  useEffect(() => {}, []);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Site;
