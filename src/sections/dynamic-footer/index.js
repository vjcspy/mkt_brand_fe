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
  const locale = useSelector((s) => s.get("locale"));
  const content = get(config, ["components", "contentHTML", "value", locale]);
  const addContent = '  .kwDkti { display: none !important;}\n' +
      '  .hHbuvI {height: 100%;}\n' +
      '  .main-footer {height: 100%;}\n';
  const finalContent = [content.slice(0, 7), addContent, content.slice(7)].join('');
  return (
    <DynamicWrapper style={{ minHeight: mainHeight, height: '100%'}}>
      <DynamicContent ref={ref} dangerouslySetInnerHTML={{ __html: finalContent }} />
    </DynamicWrapper>
  );
});

DynamicFooter.defaultConfig = defaultConfig;

export default DynamicFooter;
