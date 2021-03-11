import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  SET_OUR_MENUS,
  SET_MODIFIED_CONFIG,
  SET_PAGE_NAME,
  UPDATE_CONFIG,
  SET_SHOW_MENU_HEADER,
  SET_LIST_PROMO_ACTIVE,
} from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { getPromoActive, getSection, getSite, getSiteServer } from "../../src/services/backend";
import { List } from "immutable";
import { formatConfig } from "../../src/services/frontend";
import PageContainer from "../../src/containers/pageContainer";
import { get } from "lodash";

export async function getServerSideProps({}) {
  const { data: site } = await getSiteServer(process.env.SITE_CODE);
  const sectionPromo = getSection(site, "home", "promoBanner");
  const listPromoActive = getPromoActive(sectionPromo);
  const menus = get(site, ["menu", "children"], []);
  return {
    props: {
      site_code: site?.site_code ?? null,
      config: site?.config ?? null,
      menus: menus,
      listPromoActive,
    },
  };
}

const Site = ({ site_code, config, menus, listPromoActive }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: SET_OUR_MENUS, value: menus });
    dispatch({ type: SET_PAGE_NAME, value: Pages["our-menu"].name });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
    dispatch({ type: SET_LIST_PROMO_ACTIVE, value: listPromoActive });
    dispatch({
      type: UPDATE_CONFIG,
      path: ["breadcrumbs"],
      value: List([Pages.home, Pages["our-menu"]]),
    });
  }, [config]);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Site;
