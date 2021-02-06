import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { ItemSubMenu, SubMenu, HeaderSubMenu, MainSubMenu } from "./style";
import IconTriangleLineLeft from "../icons/iconTriangleLineLeft";
import IconTriangleRight from "../icons/iconTriangleLineRight";

function ChildMenu({ parent, setItemSubMenu }) {
  const [itemChildMenu, setItemChildMenu] = useState();
  const [className, setClassName] = useState();
  const show = useDebounce("show", 500);

  useEffect(() => {
    setClassName(show);
  }, [show]);

  const onCLoseSubMenu = () => {
    setClassName(null);
    setTimeout(() => {
      setItemSubMenu(null);
    }, 200);
  };

  return (
    <>
      <SubMenu className={`${itemChildMenu ? className + " hide " : className}`}>
        {parent && (
          <HeaderSubMenu onClick={onCLoseSubMenu}>
            <IconTriangleLineLeft width={15} height={15} />
            <h3>{parent.label}</h3>
          </HeaderSubMenu>
        )}
        <MainSubMenu>
          {parent?.subMenu?.map((item, index) => (
            <>
              {item.subMenu?.length > 0 ? (
                <ItemSubMenu key={index} onClick={() => setItemChildMenu(item)}>
                  <h4>{item.label}</h4>
                  <div>
                    <IconTriangleRight width={12} height={12} />
                  </div>
                </ItemSubMenu>
              ) : (
                <ItemSubMenu>
                  <h4> {item.label}</h4>
                </ItemSubMenu>
              )}
            </>
          ))}
        </MainSubMenu>
      </SubMenu>
      {itemChildMenu && <ChildMenu parent={itemChildMenu} setItemSubMenu={setItemChildMenu} />}
    </>
  );
}

export default ChildMenu;
