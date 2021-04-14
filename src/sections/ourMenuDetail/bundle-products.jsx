import { get } from "lodash";
import React from "react";
import Image from "../../components/image";
import { toMoney } from "../../services/frontend";
import { MenuChildImageWrapper, MenuChildItem, MenuChildItemWraper, MenuChildWraper } from "./styled";

const BundleProducts = ({ config }) => {
  return (
    <MenuChildWraper className="bundel">
      {config.products?.map((product) => (
        <MenuChildItemWraper key={product.id}>
          <MenuChildItem isFirst>
            <MenuChildImageWrapper>
              <Image src={product.image.url} alt={product.name} title={product.name} width="500" height="500" />
            </MenuChildImageWrapper>
          </MenuChildItem>
          <MenuChildItem>
            <h2>{product.name}</h2>
            <h3>{toMoney(get(product, ["price_range", "minimum_price", "final_price", "value"]))} VNĐ/người</h3>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
            <h5>Thực đơn</h5>
            <div dangerouslySetInnerHTML={{ __html: product.short_description.html }} />
          </MenuChildItem>
        </MenuChildItemWraper>
      ))}
    </MenuChildWraper>
  );
};

export default BundleProducts;
