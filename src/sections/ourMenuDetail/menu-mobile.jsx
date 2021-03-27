import { get } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { toMoney } from "../../services/frontend";
import MenuMainMobile from "./menu-main-mobile";
import MenuTreeMobile from "./menu-tree-mobile";
import { MenuMobileWrapper } from "./styled";

const MenuMobile = ({ footer, menus: propsMenus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [childrenIndex, setChildrenIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [menuDetail, setMenuDetail] = useState();

  const { menus, tree } = useMemo(() => {
    let menus = [];
    let tree = [];
    if (menuDetail) {
      setPageIndex(0);
      menuDetail.items.forEach((config, index) => {
        let items = get(config, ["options"], []);
        menus.push({
          products: items.map(({ product }) => product),
          index: index,
          parentTitle: menuDetail.name,
          price: toMoney(get(menuDetail, ["price_range", "minimum_price", "final_price", "value"])),
        });
        tree.push({
          name: config.title,
          pageIndex: index,
        });
      });
      return { menus, tree };
    }
    propsMenus.forEach((config, index) => {
      if (config.isBundle) {
        menus.push({ ...config, index });
        tree.push({ name: config.name, pageIndex: index });
      } else {
        let items = get(config, ["children"], []);
        items.forEach((config, childIndex) => {
          menus.push({ ...config, backIndex: Math.max(index - 1, 0), index, childIndex });
        });
        tree.push({
          name: config.name,
          pageIndex: index,
          children: items.map((i, childIndex) => ({
            name: i.name,
            pageIndex: childIndex + index,
          })),
        });
      }
    });
    return { menus, tree };
  }, [propsMenus, menuDetail]);

  const pageOnChange = useCallback(
    (index) => {
      if (isNaN(index)) {
        return;
      }
      if (index >= menus.length) {
        return;
      }
      setPageIndex(index);
      if (menuDetail) {
        setCurrentIndex(menus[index].index);
      } else {
        setCurrentIndex(menus[index].index);
        setChildrenIndex(menus[index].childIndex);
      }
    },
    [menuDetail, menus]
  );

  const handleClick = useCallback(
    (index) => {
      setPageIndex(index);
      pageOnChange(index);
    },
    [pageOnChange]
  );

  return (
    <MenuMobileWrapper>
      <MenuMainMobile
        menus={menus}
        footer={footer}
        pageIndex={pageIndex}
        pageOnChange={pageOnChange}
        onBack={handleClick}
        setMenuDetail={setMenuDetail}
      />
      <MenuTreeMobile tree={tree} currentIndex={currentIndex} childrenIndex={childrenIndex} onClick={handleClick} />
    </MenuMobileWrapper>
  );
};

export default MenuMobile;
