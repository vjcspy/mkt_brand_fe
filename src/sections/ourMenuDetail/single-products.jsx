import React, { useCallback, useRef } from "react";
import {
  ProductSingleContainer,
  ProductSingleItem,
  ProductSingleMobileInfo,
  ProductSingleMobileInfoWrapper,
  ProductSingleWraper,
} from "./styled";
import Image from "../../components/image";
import Button from "../../components/button";
import { get, isNil, map } from "lodash";
import { toMoney } from "../../services/frontend";
import {SET_SHOW_FOOTER} from "../../constants";

const SingleProducts = ({ config, isMobile, onBack, setMenuDetail, isDetail, scrollToFooter }) => {
  let products = config.products ?? config.options?.map((p) => p.product);
  const isSimple = config.products?.length != undefined;
  const ref = useRef();

  const onTouchStart = useCallback(
    (event) => {
      if (isMobile) {
        const win = get(ref, ["current", "ownerDocument", "defaultView", "window"], window);

        let startY = event.touches[0].pageY;
        let startX = event.touches[0].pageX;
        let endY, endX;

        const onTouchMove = (event) => {
          endY = event.touches[0].pageY;
          endX = event.touches[0].pageX;
        };

        const onTouchEnd = () => {
          if (Math.abs(startY - endY) > Math.abs(startX - endX)) {
            if (startY > endY) {
              if (ref.current && ref.current.scrollHeight - ref.current.scrollTop - win.innerHeight <= 0) {
                scrollToFooter();
              }
            }
            win.document.removeEventListener("touchend", onTouchEnd);
            win.document.removeEventListener("touchmove", onTouchMove);
          }
        };

        win.document.addEventListener("touchend", onTouchEnd);
        win.document.addEventListener("touchmove", onTouchMove);
      }
    },
    [isMobile]
  );

  const handleWheel = useCallback((e) => {
    if (Math.abs(e.deltaY) > 5) {
      if (e.deltaY > 0) {
        const win = get(ref, ["current", "ownerDocument", "defaultView", "window"], window);
        if (ref.current && ref.current.scrollHeight - ref.current.scrollTop - win.innerHeight <= 0) {
          // setShowMenuFooter(false);
        }
      }
    }
  }, []);

  return (
    <ProductSingleWraper className="wadawd sigunflf" ref={ref}
                         onTouchStart={onTouchStart}
                         onWheel={handleWheel}>
      {isMobile && (
        <ProductSingleMobileInfoWrapper>
          <Button
            varian="back"
            size="tiny"
            onClick={() => {
              if (isNil(config.backIndex)) {
                setMenuDetail();
              } else {
                onBack(config.backIndex);
              }
            }}
          >
            <h5>Back</h5>
          </Button>
          {config.parentTitle && (
            <ProductSingleMobileInfo>
              <h5>{config.parentTitle}</h5>
              <h6>{config.price} VNĐ/người</h6>
            </ProductSingleMobileInfo>
          )}
        </ProductSingleMobileInfoWrapper>
      )}
      <ProductSingleContainer>
        {map(products, (product, index) => (
          <ProductSingleItem key={index} data-name={product.name}>
            <Image width="300" height="300" src={product.image.url} alt="product" title="product" />
            <h4>{product.name}</h4>
            {!(isDetail || !isSimple) && (
              <div>{toMoney(get(product, ["price_range", "minimum_price", "final_price", "value"]))}đ</div>
            )}
          </ProductSingleItem>
        ))}
      </ProductSingleContainer>
    </ProductSingleWraper>
  );
};

export default SingleProducts;
