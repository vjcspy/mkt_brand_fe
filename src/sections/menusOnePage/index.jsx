import { map } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/button";
import PointNavigation from "../../components/point-navigation";
import ReactPageScroller from "../../../plugins/react-page-scroller";
import { toMoney } from "../../services/frontend";
import { DotsWrapper, MenuInfoWrapper, MenuScrollItem, MenuScrollWrapper } from "./styled";
import IconTriangleLineTop from "../../components/icons/iconTriangleLineTop";
import IconTriangleLineDown from "../../components/icons/iconTriangleLineDown";
import useFromJS from "../../hooks/useFromJS";
import ImageMedia from "../../development/components/imageMedia";

const defaultConfig = {
  name: "menuOnePage",
  code: "menuOnePage",
  title: "Menu One Page",
  components: {
    images: {
      type: "image",
      multiple: true,
      name: "images",
      value: [],
    },
  },
};
const imageMobile = [
  "https://ggg-api.s3.ap-southeast-1.amazonaws.com/buffet_0e7d4d0994.jpg",
  "https://ggg-api.s3.ap-southeast-1.amazonaws.com/Rectangle_15_0f24904bfb.png",
  "https://ggg-api.s3.ap-southeast-1.amazonaws.com/Mask_Group_5a755995a2.jpg",
];

const MenuOnePage = ({ config = defaultConfig }) => {
  const menus = useFromJS(["ourMenus"]);
  const [current, setCurrent] = useState(0);
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  return (
    <MenuScrollWrapper>
      <ReactPageScroller customPageNumber={current} containerHeight={`calc(100vh - ${headerHeight ?? 0}px)`} pageOnChange={setCurrent}>
        {map(menus, (item, index) => (
          <MenuScrollItem key={index}>
            {/* <Image src={item.image?.url} alt={item.title} title={item.title} /> */}
            {/* <ImageMedia preload={true} media/> */}
            <img width={500} height={500} src={imageMobile[index]} />
            <MenuInfoWrapper>
              <h1>{item.name}</h1>
              <h3>Giá chỉ từ {toMoney(item.price_range?.minimum_price)} VNĐ/người</h3>
              <Button className="button-banner" varian="primary-router" size="small" href={`/our-menu/${item.url_path}`}>
                Xem menu chi tiết
              </Button>
            </MenuInfoWrapper>
          </MenuScrollItem>
        ))}
      </ReactPageScroller>
      <DotsWrapper>
        <IconTriangleLineTop className="top" color="#ffffff" />
        <PointNavigation className="point-our-menu" size={menus.length ?? 0} currentIndex={current} display="block" />
        <IconTriangleLineDown className="bottom" color="#ffffff" />
      </DotsWrapper>
      {/* <MenuInfoWrapper>
        {current < menus.length - 1 ? (
          <IconViewMore onClick={() => setCurrent(current + 1)} className="view-more" />
        ) : (
          <IconViewMore onClick={onScrollBottom} className="view-more " />
        )}
      </MenuInfoWrapper> */}
    </MenuScrollWrapper>
  );
};

MenuOnePage.defaultConfig = defaultConfig;

export default MenuOnePage;
