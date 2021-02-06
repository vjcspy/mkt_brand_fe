import React from "react";
import ColorComponent from "./colorComponent";
import GroupComponent from "./groupComponent";
import ImageComponent from "./imageComponent";
import LinkComponent from "./linkComponent";
import RangeComponent from "./rangeComponent";
import TextComponent from "./textComponent";

const ComponentType = {
  text: TextComponent,
  image: ImageComponent,
  color: ColorComponent,
  range: RangeComponent,
  link: LinkComponent,
  group: GroupComponent,
};

const DevelopmentComponentType = ({ config, ...rest }) => {
  let Component = ComponentType[config.type];
  return Component ? <Component config={config} {...rest} /> : null;
};

export default DevelopmentComponentType;
