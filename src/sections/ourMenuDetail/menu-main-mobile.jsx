import { get } from "lodash";
import React, { useMemo } from "react";
import SingleProducts from "./single-products";
import BundleProductMobile from "./bundle-products-mobile";
import { MenuMainMobileWrapper } from "./styled";
import OnePageScrollHorizontal from "../../components/one-page-scroll-horizontal";
import { useSelector } from "react-redux";

const Product = ({ config, footer, onBack, setMenuDetail }) => {
  return config.isBundle ? (
    <BundleProductMobile config={config} footer={footer} setMenuDetail={setMenuDetail} />
  ) : (
    <SingleProducts config={config} footer={footer} isMobile={true} onBack={onBack} setMenuDetail={setMenuDetail} />
  );
};

const MenuMainMobile = ({ menus, pageOnChange, onBack, pageIndex, footer, setMenuDetail }) => {
  const headerHeight = useSelector((s) => s.get("headerHeight"));

  return (
    <MenuMainMobileWrapper >
      <OnePageScrollHorizontal
        pageIndex={pageIndex}
        containerHeight={`calc(100vh - ${headerHeight}px)`}
        pageOnChange={pageOnChange}
      >
        {menus?.map((config, i) => {
          return <Product key={i} config={config} footer={footer} onBack={onBack} setMenuDetail={setMenuDetail} />;
        })}
      </OnePageScrollHorizontal>
    </MenuMainMobileWrapper>
  );
};

export default MenuMainMobile;
