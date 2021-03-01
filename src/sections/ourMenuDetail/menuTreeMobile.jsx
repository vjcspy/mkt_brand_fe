import { get, map } from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { DEVELOPMENT_MODE } from "../../constants";
import useSiteRouter from "../../hooks/useSiteRouter";
import { MenuItemButton, MenuTreeMobileWrapper } from "./styled";

const MenuTreeMobile = ({
  indexParent,
  setIndexParent,
  indexChild,
  setIndexChild,
  indexGrandChild,
  setIndexGrandChild,
  menus,
  path,
  setPath,
}) => {
  const mode = useSelector((s) => s.get("mode"));
  const menu = useSelector((s) => s.get("menu-slug"));
  const router = useSiteRouter();

  const currentMenus = (() => {
    switch (path.length) {
      case 5:
        return get(menus, [indexParent, "children", indexChild, "children"]);
      case 3:
        return get(menus, [indexParent, "children"]);
      default:
        return menus;
    }
  })();

  const currentIndex = (() => {
    switch (path.length) {
      case 5:
        return indexGrandChild;
      case 3:
        return indexChild;
      default:
        return indexParent;
    }
  })();

  useEffect(() => {
    if (menu && menus) {
      let index = menus.findIndex((m) => m.url_key === menu);
      if (index != -1) {
        setIndexParent(index);
        let item = menus[index];
        if (get(item, ["products", "items", "length"]) > 0) {
          setIndexGrandChild(undefined);
          setIndexChild(undefined);
          setPath([index]);
        } else {
          setIndexGrandChild(undefined);
          setIndexChild(0);
          setPath([index, "children", 0]);
        }
      }
    }
  }, [menu, menus]);

  const onClickParent = (item, index) => {
    if (index == indexParent) {
      setIndexChild(undefined);
    } else {
      setIndexParent(index);
      if (mode != DEVELOPMENT_MODE) {
        router.push(`/our-menu/${item.url_key}`, undefined, { shallow: true });
      }
    }
    if (get(item, ["products", "items", "length"]) > 0) {
      setIndexGrandChild(undefined);
      setIndexChild(undefined);
      setPath([index]);
    } else {
      setIndexGrandChild(undefined);
      setIndexChild(0);
      setPath([index, "children", 0]);
    }
  };

  const onClickChild = (item, index) => {
    if (index == indexChild) {
      return;
    }
    setIndexChild(index);
    setIndexGrandChild(undefined);
    setPath([indexParent, "children", index]);
  };

  const onClickGrandChild = (item, index) => {
    setIndexGrandChild(index);
    setPath([indexParent, "children", indexChild, "children", index]);
  };

  return (
    <MenuTreeMobileWrapper>
      {map(currentMenus, (item, index) => (
        <MenuItemButton
          key={index}
          isOpen={index === currentIndex}
          onClick={() => {
            if (path.length == 1) {
              onClickParent(item, index);
            } else if (path.length == 3) {
              onClickChild(item, index);
            } else if (path.length === 5) {
              onClickGrandChild(item, index);
            }
          }}
        >
          <h5>{item.name}</h5>
        </MenuItemButton>
      ))}
    </MenuTreeMobileWrapper>
  );
};

export default MenuTreeMobile;
