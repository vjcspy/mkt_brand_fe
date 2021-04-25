import React from "react";
import SingleProducts from "./single-products";
import BundleProductMobile from "./bundle-products-mobile";
import { MenuMainMobileWrapper } from "./styled";
import OnePageScrollHorizontal from "../../components/one-page-scroll-horizontal";
import { useSelector } from "react-redux";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";

const Product = ({ config, footer, onBack, setMenuDetail, scrollToFooter, isDetail }) => {
  return config.isBundle ? (
    <BundleProductMobile
      config={config}
      footer={footer}
      setMenuDetail={setMenuDetail}
      scrollToFooter={scrollToFooter}
    />
  ) : (
    <SingleProducts
      config={config}
      footer={footer}
      isMobile={true}
      onBack={onBack}
      setMenuDetail={setMenuDetail}
      scrollToFooter={scrollToFooter}
      isDetail={isDetail}
    />
  );
};

const MenuMainMobile = ({
  menus,
  pageOnChange,
  onBack,
  pageIndex,
  footer,
  setMenuDetail,
  scrollToFooter,
  isDetail,
}) => {
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ height }, ref] = useIframeResize();

  return (
    <MenuMainMobileWrapper ref={ref}>
      <OnePageScrollHorizontal
        pageIndex={pageIndex}
        containerHeight={height - headerHeight}
        pageOnChange={pageOnChange}
      >
        {menus?.map((config, i) => {
          return (
            <Product
              key={i}
              isDetail={isDetail}
              config={config}
              footer={footer}
              onBack={onBack}
              setMenuDetail={setMenuDetail}
              scrollToFooter={scrollToFooter}
            />
          );
        })}
      </OnePageScrollHorizontal>
    </MenuMainMobileWrapper>
  );
};

export default MenuMainMobile;
