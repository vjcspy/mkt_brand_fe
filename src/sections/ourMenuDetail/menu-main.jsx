import { get } from "lodash";
import React, { useMemo } from "react";
import BundleProducts from "./bundle-products";
import SingleProducts from "./single-products";
import { MenuMainWrapper } from "./styled";

const MenuMain = ({ menus, path, setPath }) => {
  const config = useMemo(() => get(menus, path), [menus, path]);
  if (!config) {
    return null;
  }
  return (
    <MenuMainWrapper>
      {config.isBundle ? <BundleProducts config={config} /> : <SingleProducts config={config} />}
    </MenuMainWrapper>
  );
};

export default MenuMain;
