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
import { SET_DATA_INITIAL, SET_HOST, UPDATE_API_STATUS } from "../src/constants";
import { fetchParentMenu, getInitialData } from "../src/services/backend";
import useSiteRouter from "../src/hooks/useSiteRouter";
import {register, registry} from "../src/services/registry";

const ThemeWrapper = ({ children }) => {
  const theme = useFromJS(["modifiedConfig", "theme"]);
  return <ThemeProvider theme={theme ?? DefaultTheme}>{children}</ThemeProvider>;
};
const LanguageWrapper = ({ children }) => {
  const translation = useFromJS(["modifiedConfig", "translation"]);
  return <LanguageProvider messages={translation ?? defaultTranslation}>{children}</LanguageProvider>;
};

const HostWrapper = ({ children, host, graphqlHost, dataInitial, menuApi }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_HOST, host, graphqlHost });
    dispatch({ type: SET_DATA_INITIAL, value: dataInitial });
    dispatch({ type: UPDATE_API_STATUS, path: ["menu"], value: menuApi });
  }, [host, graphqlHost]);
  return children;
};

function App({ Component, pageProps, host, graphqlHost, dataInitial, menuApi }) {
  return (
    <Provider store={store}>
      <HostWrapper menuApi={menuApi} dataInitial={dataInitial} host={host} graphqlHost={graphqlHost}>
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
  let pathname = ctx.req.headers.host;
  const cache = registry(pathname);
  if(typeof cache !== 'undefined'){
    return cache;
  }

  try {
    const dataInitial = await getInitialData(ctx);
    const { storeCode, root_category_id } = dataInitial;
    const menu = await fetchParentMenu({ storeCode, rootCategory: root_category_id });
    const menuApi = menu?.children.map((item) => ({
      label: item.name,
      url: item.url_key,
    }));
    register(pathname, {
      host: process.env.API_HOST,
      graphqlHost: process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql",
      dataInitial,
      menuApi,
    });

    return registry(pathname);
  } catch (e) {
    return {
      host: process.env.API_HOST,
      graphqlHost: process.env.NEXT_PUBLIC_GGG_BRAND_PCMS + "/graphql",
      dataInitial: null,
      menuApi: null,
    };
  }
};

export default App;
