import React from "react";
import Image from "../../components/image";
import { toMoney } from "../../services/frontend";
import { MenuChildImageWrapper, MenuChildItem, MenuChildItemWraper, MenuChildWraper } from "./styled";

const MenuChildComponent = ({ config }) => {
  return (
    <MenuChildWraper>
      {config.products?.items?.map((product) => (
        <MenuChildItemWraper key={product.id}>
          <MenuChildItem isFirst>
            <MenuChildImageWrapper>
              <Image width={283} height={273} src={product.image.url} alt="product" title="product" width="500" height="500" />
            </MenuChildImageWrapper>
          </MenuChildItem>
          <MenuChildItem>
            <h2>{product.name}</h2>
            <h3>{toMoney(product.price_range.minimum_price)} VNĐ/người</h3>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
            <h5>Thực đơn</h5>
            <p>{product.short_description}</p>
          </MenuChildItem>
        </MenuChildItemWraper>
      ))}
    </MenuChildWraper>
  );
};

export default MenuChildComponent;
