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
import { SET_HOST, SET_LIST_PROVINCE, SET_NUM_PROMO, UPDATE_API_STATUS } from "../src/constants";
import {
  filterListPromoApi,
  getPromotionByBrandProvince,
  fetchMenuCategories,
  getInitialData,
  getProvinces,
} from "../src/services/backend";
import { chain } from "lodash";

const ThemeWrapper = ({ children }) => {
  const theme = useFromJS(["modifiedConfig", "theme"]);
  return <ThemeProvider theme={theme ?? DefaultTheme}>{children}</ThemeProvider>;
};
const LanguageWrapper = ({ children }) => {
  const translation = useFromJS(["modifiedConfig", "translation"]);
  return <LanguageProvider messages={translation ?? defaultTranslation}>{children}</LanguageProvider>;
};

const HostWrapper = ({ children, host, graphqlHost, provinces, numPromo, menuApi }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_HOST, host, graphqlHost });
    dispatch({ type: SET_LIST_PROVINCE, value: provinces });
    dispatch({ type: SET_NUM_PROMO, value: numPromo });
    dispatch({ type: UPDATE_API_STATUS, path: ["menu"], value: menuApi });
  }, [host, graphqlHost]);
  return children;
};

function App({ Component, pageProps, host, graphqlHost, provinces, numPromo, menuApi }) {
  return (
    <Provider store={store}>
      <HostWrapper menuApi={menuApi} numPromo={numPromo} provinces={provinces} host={host} graphqlHost={graphqlHost}>
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
    const { siteCode, storeCode, root_category_id, brand_id } = await getInitialData(ctx);

    const [listProvince, { data: listPromo }, menus] = await Promise.all([
      getProvinces(),
      getPromotionByBrandProvince({ brand_id }),
      fetchMenuCategories({ urlKey: siteCode, storeCode: storeCode, rootCategory: root_category_id }),
    ]);

    const menuApi = menus.map((item) => ({
      label: item.name,
      url: item.url_key,
    }));

    let provinces = listProvince ?? [{ id: 5, name: "Hà Nội" }];
    let numPromo = filterListPromoApi(listPromo.result.content).length;

    return {
      host: process.env.API_HOST,
      graphqlHost: process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql",
      provinces: provinces,
      numPromo,
      menuApi,
    };
  } catch (e) {
    console.log(e);
    return {
      host: process.env.API_HOST,
      graphqlHost: process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql",
      provinces: null,
      numPromo: 0,
      menuApi: null,
    };
  }
};

export default App;
