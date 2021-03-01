import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { defaultsDeep } from "lodash";

const LanguageProvider = ({ messages, children }) => {
  const locale = useSelector((state) => state.get("locale"));

  const mess = useMemo(() => {
    return defaultsDeep(messages[locale], messages.vi);
  }, [messages, locale]);

  return (
    <IntlProvider locale={locale} defaultLocale="vi" messages={mess} textComponent="span">
      {React.Children.only(children)}
    </IntlProvider>
  );
};

export default LanguageProvider;
