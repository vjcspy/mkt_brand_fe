import { get, findIndex } from "lodash";
import { stringifyUrl } from "query-string";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useRefCallback from "../../hooks/useRefCallback";
import useSiteRouter from "../../hooks/useSiteRouter";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { toMoney } from "../../services/frontend";
import MenuMainMobile from "./menu-main-mobile";
import MenuTreeMobile from "./menu-tree-mobile";
import { MenuMobileWrapper } from "./styled";

const MenuMobile = ({ menus: propsMenus, scrollToFooter }) => {
  debugger;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [childrenIndex, setChildrenIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [menuDetail, setMenuDetail] = useState();
  const router = useSiteRouter();
  const headerHeight = useSelector((s) => s.get("headerHeight") ?? 0);
  const showFooter = useSelector((s) => s.get("showFooter"));
  const [{ height }, cRef] = useIframeResize();

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
          menus.push({ ...config, backIndex: Math.max(index - 1, 0), index, childIndex: childIndex + index });
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

  const ref = useRef();
  ref.current = (index) => {
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
  };

  const pageOnChange = useCallback((index) => {
    ref.current(index);
  }, []);

  const handleClick = useCallback(
    (index) => {
      updateParam(index);
      setPageIndex(index);
      pageOnChange(index);
    },
    [pageOnChange]
  );

  const handleClickBack = useCallback(
      (index) => {
        updateParam(index);
        setPageIndex(index);
        pageOnChange(index);
      },
      [pageOnChange]
  );

  const updateParam = useRefCallback((index) => {
    const menuSelect = menus[index];
    router.pushQuery(
      stringifyUrl({
        url: `/our-menu`,
        query: { category: menuSelect.url_key },
      }),
      undefined,
      {
        shallow: true,
      }
    );
  });

  return (
    <MenuMobileWrapper ref={cRef}>
      <MenuMainMobile
        isDetail={!!menuDetail}
        menus={menus}
        pageIndex={pageIndex}
        pageOnChange={pageOnChange}
        onBack={handleClickBack}
        setMenuDetail={setMenuDetail}
        scrollToFooter={scrollToFooter}
      />
      {!showFooter && (
        <MenuTreeMobile
          top={height - headerHeight - 60}
          tree={tree}
          currentIndex={currentIndex}
          childrenIndex={childrenIndex}
          onClick={handleClick}
        />
      )}
    </MenuMobileWrapper>
  );
};

export default MenuMobile;
