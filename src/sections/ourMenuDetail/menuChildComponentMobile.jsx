import { get } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/button";
import Image from "../../components/image";
import PointNavigation from "../../components/point-navigation";
import ReactPageScroller from "../../../plugins/react-page-scroller";
import { toMoney } from "../../services/frontend";
import { MenuChildItemMobile, MenuChildMobileScroller, MenuChildMobileWrapper, DotsWrapper, MenuChildMobileInfo } from "./styled";

const MenuChildComponentMobile = ({ config, setPath, indexParent, setIndexChild, setIndexGrandChild }) => {
  const [current, setCurrent] = useState(0);
  const [product, setProduct] = useState();
  const headerHeight = useSelector((s) => s.get("headerHeight") ?? 0);
  const ref = useRef();
  const infoOffsetHeight = ref.current?.offsetHeight ?? 0;
  const height = "calc(100vh - " + (headerHeight + infoOffsetHeight - 20) + "px)";

  useEffect(() => {
    const product = get(config, ["products", current]);
    if (product) {
      setProduct(product);
    }
  }, [current, config.products]);

  return (
    <MenuChildMobileWrapper style={{ height: `calc(100vh - ${headerHeight}px)` }}>
      <MenuChildMobileScroller style={{ height: height }}>
        <ReactPageScroller containerHeight={height} pageOnChange={setCurrent}>
          {config.products?.items?.map((product, index) => (
            <MenuChildItemMobile key={index}>
              <Image width={283} height={273} src={product.image.url} />
            </MenuChildItemMobile>
          ))}
        </ReactPageScroller>
        <DotsWrapper>
          <PointNavigation size={config.products?.length ?? 0} currentIndex={current} display="block" />
        </DotsWrapper>
      </MenuChildMobileScroller>
      <MenuChildMobileInfo ref={ref}>
        <h3>{product?.name}</h3>
        <h5>{toMoney(product?.price_range.minimum_price)} VND/người</h5>
        <Button
          varian="primary"
          style={{ display: "block", width: "100%" }}
          onClick={() => {
            setIndexChild(current);
            if (get(config, ["children", current, "products", "items", "length"]) > 0) {
              setIndexGrandChild(undefined);
              setPath([indexParent, "children", current]);
            } else {
              setIndexGrandChild(0);
              setPath([indexParent, "children", current, "children", 0]);
            }
          }}
        >
          Xem menu chi tiết
        </Button>
      </MenuChildMobileInfo>
    </MenuChildMobileWrapper>
  );
};

export default MenuChildComponentMobile;
