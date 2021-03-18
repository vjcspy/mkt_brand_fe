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
import { SET_HOST } from "../src/constants";

const ThemeWrapper = ({ children }) => {
  const theme = useFromJS(["modifiedConfig", "theme"]);
  return <ThemeProvider theme={theme ?? DefaultTheme}>{children}</ThemeProvider>;
};
const LanguageWrapper = ({ children }) => {
  const translation = useFromJS(["modifiedConfig", "translation"]);
  return <LanguageProvider messages={translation ?? defaultTranslation}>{children}</LanguageProvider>;
};

const HostWrapper = ({ children, host, graphqlHost }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_HOST, host, graphqlHost });
  }, [host, graphqlHost]);
  return children;
};

function App({ Component, pageProps, host, graphqlHost }) {
  return (
    <Provider store={store}>
      <HostWrapper host={host} graphqlHost={graphqlHost}>
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
  return { host: process.env.API_HOST, graphqlHost: process.env.GRAPHQL_HOST };
};

export default App;
