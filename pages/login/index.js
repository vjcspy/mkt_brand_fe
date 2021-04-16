import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_TOKEN_USER, SET_USER_INFO } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages, RenderHeader, RenderSections } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getInitialData, getSiteServer } from "../../src/services/backend";
import { MainContainer, MainWrapper } from "../../src/styles";
import { get } from "lodash";
import NotificationProvider from "../../src/components/notification";

export async function getServerSideProps(ctx) {
  const { siteCode } = await getInitialData(ctx);
  const { data: site } = await getSiteServer(siteCode);

  return {
    props: {
      config: site?.config ?? null,
    },
  };
}

const Login = ({ config }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  const header = get(modifiedConfig, ["header"]);
  const sections = get(modifiedConfig, ["pages", Pages.login.name, "sections"]);
  useEffect(() => {
    dispatch({ type: SET_TOKEN_USER, value: null });
    dispatch({ type: SET_USER_INFO, value: null });
  }, [config]);

  return (
    <Layout>
      <RenderHeader pageName={Pages.login.name} config={header} menus={modifiedConfig?.menus} />
      <RenderSections sections={sections} />
      <NotificationProvider />
    </Layout>
  );
};

export default Login;
