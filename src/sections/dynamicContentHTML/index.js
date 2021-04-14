import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import "./style";

const defaultConfig = {
  type: "section",
  code: "dynamicContentHTML",
  name: "dynamicContentHTML",
  title: "Dynamic Content HTML",
  components: {
    title: {
      type: "textIgnoreLocale",
      title: "Block Title",
      value: "Block HTML",
      name: "blockHTML",
    },
    contentHTML: {
      type: "text",
      title: "Content HTML",
      value: { vi: "", en: "" },
      name: "contentHTML",
    },
  },
};

const DynamicContentHTML = ({ config = defaultConfig }) => {
  const locale = useSelector((state) => state.get("locale"));
  const contentHTML = get(config, ["components", "contentHTML", "value"]);
  return <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: contentHTML[locale] }} />;
};

DynamicContentHTML.defaultConfig = defaultConfig;

export default DynamicContentHTML;
