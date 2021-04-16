import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_SHOW_MENU_HEADER } from "../src/constants";
import Layout from "../src/containers/layout";
import { Pages } from "../src/sections";
import { formatConfig } from "../src/services/frontend";
import { getInitialData, getSiteServer } from "../src/services/backend";
import HomePageContainer from "../src/containers/homePageContainer";

export async function getServerSideProps(ctx) {
  try {
    const { siteCode } = await getInitialData(ctx);
    const { data: site } = await getSiteServer(siteCode);
    return {
      props: {
        config: site?.config ?? null,
      },
    };
  } catch (e) {
    return {
      props: {
        config: null,
      },
    };
  }
}

const Site = ({ config }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  useEffect(() => {
    dispatch({ type: SET_SHOW_MENU_HEADER, value: true });
    return () => {
      dispatch({ type: SET_SHOW_MENU_HEADER, value: false });
    };
  }, [config]);

  return (
    <Layout>
      <HomePageContainer pageName={Pages.home.name} modifiedConfig={modifiedConfig} shouldHideFooter={true} />
    </Layout>
  );
};

export default Site;
