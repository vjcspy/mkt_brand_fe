import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
const defaultConfig = {
  type: "text",
  name: "dynamicHTMLFooter",
  title: "Dynamic HTML Footer",
  components: {
    contentHTML: { type: "text", title: "Content HTML", value: { vi: "", en: "" }, name: "text" },
  },
};
const DynamicFooter = ({ config = defaultConfig }) => {
  const locale = useSelector((s) => s.get("locale"));
  const content = get(config, ["components", "contentHTML", "value", locale]);
  return <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: content }} />;
};

DynamicFooter.defaultConfig = defaultConfig;

export default DynamicFooter;
