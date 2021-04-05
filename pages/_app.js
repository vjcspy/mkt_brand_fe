// import "../src/styles/globals.scss";
import { GlobalStyle } from "../src/styles/globals";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "../src/styles/theme";
import store from "../src/redux/store";
import LanguageProvider from "../src/components/language-provider";
import { Provider, useDispatch } from "react-redux";
import useFromJS from "../src/hooks/useFromJS";
import defaultTranslation from "../src/translations";
import { useEffect } from "react";
import { SET_HOST, SET_LIST_PROVINCE, SET_NUM_PROMO } from "../src/constants";
import {
  filterListPromoApi,
  getWebsitesConfig,
  getProvinces,
  getSiteCode,
  getPromotionByBrandProvince,
} from "../src/services/backend";

const ThemeWrapper = ({ children }) => {
  const theme = useFromJS(["modifiedConfig", "theme"]);
  return <ThemeProvider theme={theme ?? DefaultTheme}>{children}</ThemeProvider>;
};
const LanguageWrapper = ({ children }) => {
  const translation = useFromJS(["modifiedConfig", "translation"]);
  return <LanguageProvider messages={translation ?? defaultTranslation}>{children}</LanguageProvider>;
};

const HostWrapper = ({ children, host, graphqlHost, provinces, numPromo }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_HOST, host, graphqlHost });
    dispatch({ type: SET_LIST_PROVINCE, value: provinces });
    dispatch({ type: SET_NUM_PROMO, value: numPromo });
  }, [host, graphqlHost]);
  return children;
};

function App({ Component, pageProps, host, graphqlHost, provinces, numPromo }) {
  return (
    <Provider store={store}>
      <HostWrapper numPromo={numPromo} provinces={provinces} host={host} graphqlHost={graphqlHost}>
        <LanguageWrapper>
          <ThemeWrapper>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeWrapper>
        </LanguageWrapper>
      </HostWrapper>
    </Provider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  // const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  // console.log("getInitialProps App");
  try {
    const pathname = ctx.req.headers.host === "localhost:3041" ? "gogi.ggg.systems" : ctx.req.headers.host;
    const { website_code } = await getWebsitesConfig(pathname);
    const { id: brandId } = await getSiteCode(website_code);

    const [{ data: listProvince }, { data: listPromo }] = await Promise.all([
      getProvinces(),
      getPromotionByBrandProvince({ brandId }),
    ]);
    let provinces = listProvince.result?.map((item) => ({ id: item?.id, name: item?.name })) ?? [
      { id: 5, name: "Hà Nội" },
    ];
    let numPromo = filterListPromoApi(listPromo.result.content).length;

    return {
      host: process.env.API_HOST,
      graphqlHost: process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql",
      provinces: provinces,
      numPromo,
    };
  } catch (e) {
    return {
      host: process.env.API_HOST,
      graphqlHost: process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql",
      provinces: null,
      numPromo: 0,
    };
  }
};

export default App;
