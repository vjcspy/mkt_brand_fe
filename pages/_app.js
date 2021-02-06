// import "../src/styles/globals.scss";
import { GlobalStyle } from "../src/styles/globals";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "../src/styles/theme";
import { Provider, useSelector } from "react-redux";
import store from "../src/redux/store";

const ThemeWrapper = ({ children }) => {
  const theme = useSelector((s) => s.getIn(["modifiedConfig", "theme"]));
  return <ThemeProvider theme={theme?.toJS() ?? DefaultTheme}>{children}</ThemeProvider>;
};

function App({ Component, pageProps }) {
  if (process.browser) {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  return (
    <Provider store={store}>
      <ThemeWrapper>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  );
}

// App.getInitialProps = async ({ Component, ctx }) => {
//   const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
//   console.log("getInitialProps App");
//   return { pageProps };
// };

export default App;
