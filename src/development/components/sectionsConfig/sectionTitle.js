import { find, toArray } from "lodash";
import React from "react";
import { SectionTitleWrapper } from "./styled";

const SectionTitle = ({ components }) => {
  let title = find(toArray(components), (e) => e.type == "text")?.value;
  title = typeof title === "object" ? title.vi : title;
  return <SectionTitleWrapper>{title}</SectionTitleWrapper>;
};

export default SectionTitle;
