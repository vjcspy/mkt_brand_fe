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

  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        xfbml            : true,
        version          : 'v10.0'
      });
      FB.CustomerChat.hide();
    };

    const fjs = document.getElementsByTagName("script")[0];
    if (document.getElementById('facebook-jssdk')) return;
    const script = document.createElement("script");
    script.id = 'facebook-jssdk';
    script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(script, fjs);
  }, []);
  return (
    <Layout>
      <HomePageContainer pageName={Pages.home.name} modifiedConfig={modifiedConfig} shouldHideFooter={true} />
      <div id="fb-root"></div>
      <div class="fb-customerchat"
           attribution="biz_inbox"
           page_id="103388957919806">
      </div>


    </Layout>
  );
};

export default Site;
