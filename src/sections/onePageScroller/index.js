import React, { useState } from "react";
import Button from "../../components/button";
import IconViewMore from "../../components/icons/iconViewMore";
import { useSelector } from "react-redux";

import ReactPageScroller from "../../../plugins/react-page-scroller";
import ImageMedia from "../../development/components/imageMedia";
import { WrapperOnePageScroller, GroupButton, WrapperListPoint } from "./style";
import PointNavigation from "../../components/point-navigation";
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "onePageScroller",
  title: "One Page Scroller",
  components: {
    images: {
      type: "image",
      multiple: true,
      name: "images",
      value: [],
    },
  },
};

const OnePageScroller = ({ config = defaultConfig }) => {
  const [currentPage, setCurrentPage] = useState();
  const components = config.components;
  const length = components.images?.value.length ?? 0;
  const headerHeight = useSelector((s) => s.get("headerHeight"));

  // let index = 0;
  // let image = components.images?.value[0];
  // debugger;
  return (
    <WrapperOnePageScroller>
      <ReactPageScroller containerHeight={`calc(100vh - ${headerHeight ?? 0}px)`} pageOnChange={setCurrentPage}>
        {components.images?.value.map((image, index) => (
          <ImageMedia key={index} style={{ width: "100%", height: "100%", objectFit: "cover" }} media={image} />
        ))}
      </ReactPageScroller>
      <GroupButton>
        <Button>View Menu</Button>
        <IconViewMore />
      </GroupButton>
      <WrapperListPoint>
        <PointNavigation display="block" currentIndex={currentPage} size={length} />
      </WrapperListPoint>
    </WrapperOnePageScroller>
  );
};

OnePageScroller.defaultConfig = defaultConfig;

export default OnePageScroller;
