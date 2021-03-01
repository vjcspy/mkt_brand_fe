import React, { useMemo } from "react";
import { MenuGrandChildItem, MenuGrandChildMobileInfo, MenuGrandChildMobileInfoWrapper, MenuGrandChildWraper } from "./styled";
import Image from "../../components/image";
import { toMoney } from "../../services/frontend";
import Button from "../../components/button";
import { get } from "lodash";

const MenuGrandChildComponent = ({
  config,
  isMobile,
  path,
  setPath,
  indexParent,
  indexChild,
  setIndexParent,
  setIndexChild,
  setIndexGrandChild,
  menus,
}) => {
  return (
    <>
      {isMobile && path.length > 1 && (
        <MenuGrandChildMobileInfoWrapper>
          <Button
            varian="back"
            size="tiny"
            onClick={() => {
              setPath([indexParent]);
              setIndexChild(undefined);
              setIndexGrandChild(undefined);
            }}
          >
            <h5>Back</h5>
          </Button>
          {
            useMemo(() => {
              if (path.length >= 3) {
                const parentConfig = get(menus, [indexParent, "products", indexChild]);
                if (!parentConfig) {
                  return null;
                }
                return (
                  <MenuGrandChildMobileInfo>
                    <h5>{parentConfig.name}</h5>
                    <h6>{toMoney(parentConfig.price_range?.minimum_price)} VNĐ/người</h6>
                  </MenuGrandChildMobileInfo>
                );
              }
            }, [
              menus,
              path,
            ]) /* <MenuGrandChildMobileInfo>
            <h5>{config.name}</h5>
            <h6>{toMoney(config.price_range?.minimum_price)} VNĐ/người</h6>
          </MenuGrandChildMobileInfo> */
          }
        </MenuGrandChildMobileInfoWrapper>
      )}
      <MenuGrandChildWraper>
        {config?.products?.items?.map((product) => (
          <MenuGrandChildItem key={product.id}>
            <Image width={283} height={273} src={product.image.url} alt="product" title="product" width="283" height="237" />
            <h4>{product.name}</h4>
          </MenuGrandChildItem>
        ))}
      </MenuGrandChildWraper>
    </>
  );
};

export default MenuGrandChildComponent;
