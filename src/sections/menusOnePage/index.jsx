import { map } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/button";
import IconViewMore from "../../components/icons/iconViewMore";
import Image from "../../components/image";
import PointNavigation from "../../components/point-navigation";
import ReactPageScroller from "../../../plugins/react-page-scroller";
import { toMoney } from "../../services/frontend";
import { DotsWrapper, MenuInfoWrapper, MenuScrollItem, MenuScrollWrapper } from "./styled";

const defaultConfig = {
  name: "menuOnePage",
  code: "menuOnePage",
  title: "Menu One Page",
  components: {},
};

const MenuOnePage = ({}) => {
  const menus = useSelector((s) => s.get("ourMenus"))?.toJS();
  const [current, setCurrent] = useState(0);
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const site_code = useSelector((s) => s.get("site_code"));

  // const mode = useSelector((s) => s.get("mode"));
  // useEffect(() => {
  //   if (process.browser) {
  //     let frame = mode == DEVELOPMENT_MODE ? window.frames[0].window : window;
  //     frame.document.body.style.overflow = current === menus?.length - 1 ? "" : "hidden";
  //   }
  // }, [mode, current, menus?.length]);

  return (
    <MenuScrollWrapper>
      <ReactPageScroller containerHeight={`calc(100vh - ${headerHeight ?? 0}px)`} pageOnChange={setCurrent}>
        {map(menus, (item, index) => (
          <MenuScrollItem key={index}>
            <Image src={item.image.url} alt={item.title} title={item.title} />
          </MenuScrollItem>
        ))}
      </ReactPageScroller>
      <DotsWrapper>
        <PointNavigation size={menus?.length ?? 0} currentIndex={current} display="block" />
      </DotsWrapper>
      {menus?.[current] && (
        <MenuInfoWrapper>
          <h1>{menus[current].name}</h1>
          <h3>Giá chỉ từ {toMoney(menus[current].price_range.minimum_price)} VNĐ/người</h3>
          <Button varian="primary-router" size="small" href={`/our-menu/${menus[current].slug}`}>
            Xem menu chi tiết
          </Button>
          <IconViewMore />
        </MenuInfoWrapper>
      )}
    </MenuScrollWrapper>
  );
};

MenuOnePage.defaultConfig = defaultConfig;

export default MenuOnePage;
