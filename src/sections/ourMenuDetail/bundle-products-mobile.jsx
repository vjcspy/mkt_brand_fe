import { get } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/button";
import Image from "../../components/image";
import PointNavigation from "../../components/point-navigation";
import { toMoney } from "../../services/frontend";
import {
  MenuChildItemMobile,
  MenuChildMobileScroller,
  MenuChildMobileWrapper,
  DotsWrapper,
  MenuChildMobileInfo,
} from "./styled";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import OnePageScrollMenu from "../../components/one-page-scroll/one-page-scroll-menu";

const BundleProductMobile = ({ config, setMenuDetail, scrollToFooter }) => {
  const [current, setCurrent] = useState(0);
  const [product, setProduct] = useState();
  const [shouldHide, setShouldHide] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const headerHeight = useSelector((s) => s.get("headerHeight") ?? 0);
  const [{ height }, ref] = useIframeResize();
  const infoOffsetHeight = ref.current?.offsetHeight ?? 0;

  useEffect(() => {
    const h = height - (headerHeight + infoOffsetHeight - 20);
    setItemHeight(h);
    setContainerHeight(height - headerHeight);
  }, [height, headerHeight, infoOffsetHeight]);

  useEffect(() => {
    const product = get(config, ["products", current]);
    if (product) {
      setProduct(product);
    }
    setShouldHide(!product);
  }, [current, config.products]);

  const items = useMemo(() => config.products ?? [], [config]);

  return (
    <MenuChildMobileWrapper style={{ height: containerHeight }}>
      <MenuChildMobileScroller>
        <OnePageScrollMenu
          containerHeight={containerHeight}
          itemHeight={itemHeight}
          pageOnChange={setCurrent}
          scrollToFooter={scrollToFooter}
        >
          {items.map((product, index) => (
            <MenuChildItemMobile key={index} style={{ height: itemHeight }}>
              <Image width="300" height="300" src={product.image.url} alt={product.name} title={product.name} />
            </MenuChildItemMobile>
          ))}
        </OnePageScrollMenu>
        <DotsWrapper style={{ top: `calc(57%)`, right:`calc(45%)` }}>
          <PointNavigation size={config.products?.length ?? 0} currentIndex={current} display="inline-block" />
        </DotsWrapper>
      </MenuChildMobileScroller>
      <MenuChildMobileInfo ref={ref} className={shouldHide ? "hide" : ""}>
        <h3>{product?.name}</h3>
        <h5>{toMoney(get(product, ["price_range", "minimum_price", "final_price", "value"]))} VNĐ/người</h5>
        <Button
          varian="primary"
          style={{ display: product && product.items && product.items.length ? "block" : "none", width: "100%",  }}
          onClick={() => {
            setMenuDetail(product);
          }}
        >
          Xem menu chi tiết
        </Button>
      </MenuChildMobileInfo>
    </MenuChildMobileWrapper>
  );
};

export default BundleProductMobile;
