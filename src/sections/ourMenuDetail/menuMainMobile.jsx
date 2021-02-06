import { get } from "lodash";
import React, { useMemo } from "react";
import MenuGrandChildComponent from "./menuGrandChildComponent";
import MenuChildComponentMobile from "./menuChildComponentMobile";
import { MenuMainMobileWrapper } from "./styled";

const MenuMainMobile = (props) => {
  const { menus, path } = props;
  const config = useMemo(() => get(menus, path), [menus, path]);
  return (
    <MenuMainMobileWrapper>
      {config?.type == "category" ? (
        <MenuChildComponentMobile config={config} {...props} />
      ) : (
        <MenuGrandChildComponent config={config} {...props} isMobile={true} />
      )}
    </MenuMainMobileWrapper>
  );
};

export default MenuMainMobile;
