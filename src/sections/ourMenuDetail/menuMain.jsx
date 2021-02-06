import { get } from "lodash";
import React, { useMemo } from "react";
import MenuChildComponent from "./menuChildComponent";
import MenuGrandChildComponent from "./menuGrandChildComponent";
import { MenuMainWrapper } from "./styled";

const MenuMain = ({ menus, path, setPath }) => {
  const config = useMemo(() => get(menus, path), [menus, path]);
  if (!config) {
    return null;
  }
  return (
    <MenuMainWrapper>
      {config.type == "category" ? <MenuChildComponent config={config} /> : <MenuGrandChildComponent config={config} />}
    </MenuMainWrapper>
  );
};

export default MenuMain;
