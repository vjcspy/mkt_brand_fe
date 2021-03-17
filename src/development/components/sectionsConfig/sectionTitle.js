import { find, toArray } from "lodash";
import React from "react";
import { SectionTitleWrapper } from "./styled";

const SectionTitle = ({ components, ...rest }) => {
  let title = find(toArray(components), (e) => e?.type == "text" || e?.type == "textIgnoreLocale")?.value;
  title = typeof title === "object" ? title.vi : title;
  return <SectionTitleWrapper {...rest}>{title}</SectionTitleWrapper>;
};

export default SectionTitle;
