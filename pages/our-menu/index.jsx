import { chain, get } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_SHOW_MENU_HEADER } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSiteServer, fetchMenuCategories, getSiteCode, getWebsitesData } from "../../src/services/backend";
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

export async function getServerSideProps({ }) {
  const webSites = await getWebsitesData();
  const webData = chain(webSites)
    .get(["data", "rows"])
    .find((e) => e.name === 'gogi')
    .value();
  const store = chain(webData).get(["groups", 0, "stores", 0]).value();

  const siteCode = webData?.code ?? process.env.SITE_CODE;
  const storeCode = store?.code ?? process.env.STORE_CODE;

  const [{ data: site }, menus] = await Promise.all([
    getSiteServer(siteCode),
    fetchMenuCategories({ urlKey: "gogi", storeCode }),
  ]);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      menus: menus ?? [],
    },
  };
}

const Site = ({ site_code, config, menus }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);

  useEffect(() => {
    dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    return () => dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
  }, [config]);

  return (
    <Layout>
      <PageContainer
        menus={menus}
        pageName={Pages["our-menu"].name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
        shouldHideFooter={Pages["our-menu"].shouldHideFooter}
      />
    </Layout>
  );
};

export default Site;
