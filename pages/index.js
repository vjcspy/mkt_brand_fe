import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  SET_LIST_PROMO_ACTIVE,
  SET_MODIFIED_CONFIG,
  SET_PAGE_NAME,
  SET_SHOW_MENU_HEADER,
  SHOW_LIST_BRAND,
  UPDATE_CONFIG,
} from "../src/constants";
import Layout from "../src/containers/layout";
import PageContainer from "../src/containers/pageContainer";
import { Pages } from "../src/sections";
import { formatConfig } from "../src/services/frontend";
import { getPromoActive, getSection, getSiteServer } from "../src/services/backend";

export async function getServerSideProps() {
  const site_code = process.env.SITE_CODE;
  const { data: site } = await getSiteServer(site_code);
  const sectionPromo = getSection(site, "home", "promoBanner");
  const listPromoActive = getPromoActive(sectionPromo);

  return {
    props: {
      config: site?.config ?? null,
      site_code: site_code ?? null,
      listPromoActive,
    },
  };
}

const Site = ({ config, site_code, listPromoActive }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages.home.name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
    dispatch({ type: SET_LIST_PROMO_ACTIVE, value: listPromoActive });
    return () => {
      dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    };
  }, [config]);

  return (
    <Layout>
      <PageContainer />
    </Layout>
  );
};

export default Site;
