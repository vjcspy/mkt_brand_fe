import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_MENU_HEADER } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSiteServer, fetchMenuCategories, getInitialData } from "../../src/services/backend";
import OurMenuContainer from "../../src/containers/our-menu-container";
import { WebStorage } from "../../src/services/web-storage";
import _ from "lodash";

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

export async function getServerSideProps(ctx) {
  const { siteCode, storeCode, root_category_id } = await getInitialData(ctx);
  const [{ data: site }, menus] = await Promise.all([
    getSiteServer(siteCode),
    fetchMenuCategories({ urlKey: siteCode, storeCode: storeCode, rootCategory: root_category_id })
  ]);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      menus: menus ?? []
    }
  };
}

const Site = ({ site_code, config, menus }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);

  const [menu, setMenu] = useState(menus);
  const provinceSelected = useSelector(state => state.get("provinceSelected"));

  useEffect(() => {
    const resolveMenu = async () => {
      const webStorage = new WebStorage();

      const websiteData = webStorage.get("websiteData");
      if (websiteData) {
        const group = _.find(websiteData.groups, (g) => g["province_id"] == provinceSelected.get("id"));

        if (group) {
          const store = _.first(group.stores);
          if (store) {
            const cacheKey = "MENU_ON_STORECODE_" + store.code + "_ROOT_CATEGORY_ID_" + group.root_category_id;
            const menuIncache = webStorage.get(cacheKey);
            if (menuIncache) {
              setMenu(menuIncache);
            } else {
              const menus = await fetchMenuCategories({
                storeCode: store.code,
                rootCategory: group.root_category_id
              });
              console.log(menus);
              if (menus) {
                webStorage.save(cacheKey, menus);
                setMenu(menus);
              }
            }
          }
        }
      }
    };
    resolveMenu();
  }, [provinceSelected.get("id")]);

  useEffect(() => {
    dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    return () => dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
  }, [config]);

  return (
    <Layout>
      <OurMenuContainer
        menus={menu}
        pageName={Pages["our-menu"].name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
        shouldHideFooter={Pages["our-menu"].shouldHideFooter}
      />
    </Layout>
  );
};

export default Site;
