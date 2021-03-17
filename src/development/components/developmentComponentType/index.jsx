import React from "react";
import ColorComponent from "./colorComponent";
import GroupComponent from "./groupComponent";
import ImageComponent from "./imageComponent";
import LinkComponent from "./linkComponent";
import MenuComponent from "./menu";
import RangeComponent from "./rangeComponent";
import TextComponent from "./textComponent";
import RadioComponent from "./radioComponent";
import EditerComponent from "./editerComponent";
import BlogComponent from "./blogComponent";
import GroupBlogComponent from "./groupBlogComponent";
import TextIgnoreLocaleComponent from "./textIgnoreLocaleComponent";
const ComponentType = {
  text: TextComponent,
  image: ImageComponent,
  color: ColorComponent,
  range: RangeComponent,
  link: LinkComponent,
  group: GroupComponent,
  menu: MenuComponent,
  radio: RadioComponent,
  editer: EditerComponent,
  blog: BlogComponent,
  groupBlog: GroupBlogComponent,
  textIgnoreLocale: TextIgnoreLocaleComponent,
};

const DevelopmentComponentType = ({ config, ...rest }) => {
  let Component = ComponentType[config.type];
  return Component ? <Component config={config} {...rest} /> : null;
};

export default DevelopmentComponentType;
