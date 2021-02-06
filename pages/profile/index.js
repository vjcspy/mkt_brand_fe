import { List } from "immutable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_MODIFIED_CONFIG, SET_PAGE_NAME, UPDATE_CONFIG } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages, RenderFooter, RenderHeader } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getSite } from "../../src/services/backend";
import useFromJS from "../../src/hooks/useFromJS";
import { MainContainer, MainWrapper } from "../../src/styles";
import ProfileSection from "../../src/sections/profileSection";
import Breadcrumbs from "../../src/sections/breadcrumbs";

export async function getStaticProps() {
  const site = await getSite(process.env.SITE_CODE);

  return {
    props: {
      config: site?.config ?? null,
      site_code: site?.site_code ?? null,
    },
  };
}

const Profile = ({ config, site_code }) => {
  const dispatch = useDispatch();
  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);

  useEffect(() => {
    const modifiedConfig = formatConfig(config);
    dispatch({ type: SET_PAGE_NAME, value: Pages.profile.name });
    dispatch({ type: SET_MODIFIED_CONFIG, value: modifiedConfig });
    dispatch({ type: UPDATE_CONFIG, path: ["site_code"], value: site_code });
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
