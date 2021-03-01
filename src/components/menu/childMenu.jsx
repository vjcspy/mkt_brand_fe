import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { ItemSubMenu, SubMenu, HeaderSubMenu, MainSubMenu } from "./style";
import IconTriangleLineLeft from "../icons/iconTriangleLineLeft";
import IconTriangleRight from "../icons/iconTriangleLineRight";
import LinkRouter from "../link-router";

function ChildMenu({ parent, setItemSubMenu, onCloseMenu, locale }) {
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
            <h4>{parent.label?.[locale]}</h4>
          </HeaderSubMenu>
        )}
        <MainSubMenu>
          {parent?.children?.map((item, index) =>
            item.children?.length > 0 ? (
              <ItemSubMenu key={index} onClick={() => setItemChildMenu(item)}>
                <h5>{item.label?.[locale]}</h5>
                <div>
                  <IconTriangleRight width={12} height={12} />
                </div>
              </ItemSubMenu>
            ) : (
              <ItemSubMenu key={index}>
                <h5 onClick={onCloseMenu}>
                  <LinkRouter href={item.url} passHref>
                    <a>{item.label?.[locale]}</a>
                  </LinkRouter>
                </h5>
              </ItemSubMenu>
            )
          )}
        </MainSubMenu>
      </SubMenu>
      {itemChildMenu && <ChildMenu locale={locale} parent={itemChildMenu} setItemSubMenu={setItemChildMenu} onCloseMenu={onCloseMenu} />}
    </>
  );
}

export default ChildMenu;
