import React from "react";
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

const SingleProducts = ({ config, isMobile, footer, onBack, setMenuDetail }) => {
  let products = config.products ?? config.options?.map((p) => p.product);
  const isSimple = config.products?.length != undefined;
  return (
    <ProductSingleWraper className="wadawd">
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
            {isSimple && (
              <div>{toMoney(get(product, ["price_range", "minimum_price", "final_price", "value"]))}đ</div>
            )}
          </ProductSingleItem>
        ))}
      </ProductSingleContainer>
    </ProductSingleWraper>
  );
};

export default SingleProducts;
