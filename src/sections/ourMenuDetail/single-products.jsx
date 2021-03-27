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
import DynamicFooter from "../dynamic-footer";
import { isNil, map } from "lodash";

const SingleProducts = ({ config, isMobile, footer, onBack, setMenuDetail }) => {
  let products = config.products ?? config.options?.map((p) => p.product);
  return (
    <ProductSingleWraper>
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
        {map(products, (product) => (
          <ProductSingleItem key={product.id}>
            <Image width="300" height="300" src={product.image.url} alt="product" title="product" />
            <h4>{product.name}</h4>
          </ProductSingleItem>
        ))}
      </ProductSingleContainer>
      {isMobile && <DynamicFooter config={footer} />}
    </ProductSingleWraper>
  );
};

export default SingleProducts;
