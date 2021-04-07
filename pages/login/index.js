import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACCEPT_COOKIE, SET_TOKEN_USER, SET_USER_INFO } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";
import { useRouter } from "next/dist/client/router";

export async function getServerSideProps() {
  const site_code = process.env.SITE_CODE;
  const { data: site } = await getSiteServer(site_code);
  return {
    props: {
      config: site?.config ?? null,
      site_code: site?.site_code ?? null,
    },
  };
}

const Login = ({ config, site_code }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);

  useEffect(() => {
    dispatch({ type: ACCEPT_COOKIE, value: true });
    dispatch({ type: SET_TOKEN_USER, value: null });
    dispatch({ type: SET_USER_INFO, value: null });
  }, [config]);

  return (
    <Layout>
      <PageContainer
        pageName={Pages.login.name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
        shouldHideFooter={true}
      />
    </Layout>
  );
};

export default Login;
