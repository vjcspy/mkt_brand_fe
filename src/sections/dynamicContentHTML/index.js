import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import "./style";

const defaultConfig = {
  type: "section",
  code: "dynamicContentHTML",
  name: "dynamicContentHTML",
  title: "Dynamic HTML",
  components: {
    title: {
      type: "text",
      title: "Block Title",
      value: { vi: "Dynamic Content HTML", en: "Dynamic Content HTML" },
      name: "titleDynamicContent",
    },
    contentHTML: {
      type: "textIgnoreLocale",
      title: "Content HTML",
      value: "",
      name: "contentHTML",
    },
  },
};

const DynamicContentHTML = ({ config = defaultConfig }) => {
  const locale = useSelector((state) => state.get("locale"));
  const contentHTML = get(config, ["components", "contentHTML", "value"]);
  return <div dangerouslySetInnerHTML={{ __html: contentHTML }} />;
};

DynamicContentHTML.defaultConfig = defaultConfig;

export default DynamicContentHTML;
