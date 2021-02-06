import { find, toArray } from "lodash";
import React from "react";
import { SectionTitleWrapper } from "./styled";

const SectionTitle = ({ components }) => {
  let title = find(toArray(components), (e) => e.type == "text")?.value;
  return <SectionTitleWrapper>{title}</SectionTitleWrapper>;
};

export default SectionTitle;
