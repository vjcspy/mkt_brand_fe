import { get } from "lodash";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { DynamicContent, DynamicWrapper } from "./styled";
const defaultConfig = {
  type: "text",
  name: "dynamicHTMLFooter",
  title: "Dynamic HTML Footer",
  components: {
    contentHTML: { type: "text", title: "Content HTML", value: { vi: "", en: "" }, name: "text" },
  },
};
const DynamicFooter = forwardRef(({ config = defaultConfig, mainHeight }, ref) => {

  const height = '100%';
  const locale = useSelector((s) => s.get("locale"));
  const content = get(config, ["components", "contentHTML", "value", locale]);
  return (
    <DynamicWrapper style={{ minHeight: mainHeight, height: height }}>
      <DynamicContent ref={ref} dangerouslySetInnerHTML={{ __html: content }} />
    </DynamicWrapper>
  );
});

DynamicFooter.defaultConfig = defaultConfig;

export default DynamicFooter;
