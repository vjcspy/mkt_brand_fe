import { List } from "immutable";
import { map } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages, RenderFooter, RenderHeader } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSite } from "../../src/services/backend";
import { MainContainer, MainWrapper } from "../../src/styles";
import Breadcrumbs from "../../src/sections/breadcrumbs";
import ProfileSection from "../../src/sections/profileSection";
import useFromJS from "../../src/hooks/useFromJS";

export async function getStaticPaths() {
  const tabs = ["my-profile", "my-promo", "my-history", "register-promo"];
  const tabPaths = map(tabs, (tab) => ({
    params: { tab: tab },
  }));
  return {
    paths: tabPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { site_code, tab } = params;
  const site = await getSite(process.env.SITE_CODE);
  return {
    props: {
      config: site?.config ?? null,
      site_code: site?.site_code ?? null,
      tab: tab ?? null,
    },
  };
}

const Profile = ({ config, site_code, tab }) => {
  const dispatch = useDispatch();
  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages.profile.name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
    dispatch({ type: UPDATE_CONFIG, path: ["profile-tab"], value: tab });
    dispatch({
      type: UPDATE_CONFIG,
      path: ["breadcrumbs"],
      value: List([Pages.home, Pages.profile]),
    });
  }, [config]);

  return (
    <Layout>
      <MainContainer>
        <RenderHeader config={header} />
        <MainWrapper className="main-content">
          <Breadcrumbs />
          <ProfileSection />
        </MainWrapper>
        <RenderFooter config={footer} />
      </MainContainer>
    </Layout>
  );
};

export default Profile;
