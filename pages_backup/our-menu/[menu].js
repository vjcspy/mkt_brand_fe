import { List } from "immutable";
import { each, get, isArray, map, sortBy } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  SET_SHOW_MENU_HEADER,
  UPDATE_CONFIG,
} from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import {  getSiteServer, fetchMenuCategories } from "../../src/services/backend";
import useSiteRouter from "../../src/hooks/useSiteRouter";
import PageContainer from "../../src/containers/pageContainer";

// export async function getStaticPaths() {
//   const site = await getSite(process.env.SITE_CODE);
//   const menus = get(site, ["menu", "children"], []);
//   const menuPaths = map(menus, (menu) => ({
//     params: { menu: menu.url_key, menus },
//   }));
//   return {
//     paths: menuPaths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({}) {
//   const site = await getSite(process.env.SITE_CODE);
//   console.log("this is default: ", site);
//   const menus = get(site, ["menu", "children"], []);
//   return {
//     props: {
//       site_code: site?.site_code ?? null,
//       config: site?.config ?? null,
//       menus: menus,
//     },
//   };
// }

export async function getServerSideProps({}) {
  try {
    const siteCode = process.env.SITE_CODE;
    const [{ data: site }, menu] = await Promise.all([
      getSiteServer(siteCode),
      fetchMenuCategories({ urlKey: siteCode }),
    ]);
    const menus = get(menu, ["children"], []);
    return {
      props: {
        site_code: site?.site_code ?? null,
        config: site?.config ?? null,
        menus: menus,
      },
    };
  } catch (e) {
    return {
      props: {
        site_code: null,
        config: null,
        menus: null,
      },
    };
  }
}

const Site = ({ site_code, config, menus }) => {
  const {
    query: { menu },
  } = useSiteRouter();
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);

  useEffect(() => {
    // dispatch({
    //   type: UPDATE_CONFIG,
    //   path: ["breadcrumbs"],
    //   value: List([Pages.home, Pages["our-menu"]]),
    // });
    dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    return () => dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
  }, [config]);

  useEffect(() => {
    dispatch({ type: UPDATE_CONFIG, path: ["menu-slug"], value: menu });

    // let menuName = menus.find((m) => m.url_key === menu)?.name ?? "";
    // dispatch({
    //   type: UPDATE_CONFIG,
    //   path: ["breadcrumbs"],
    //   value: List([
    //     Pages.home,
    //     Pages["our-menu"],
    //     {
    //       ...Pages["our-menu-detail"],
    //       path: "/our-menu/" + menu,
    //       title: menuName,
    //     },
    //   ]),
    // });
  }, [menu]);

  useEffect(() => {}, []);

  return (
    <Layout>
      <PageContainer
        menus={menus}
        pageName={Pages["our-menu-detail"].name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
      />
    </Layout>
  );
};

export default Site;
