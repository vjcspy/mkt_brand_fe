import { get, has, isArray, map } from "lodash";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import IconTriangleDown from "../../components/icons/iconTriangleDown";
import { DEVELOPMENT_MODE } from "../../constants";
import useSiteRouter from "../../hooks/useSiteRouter";
import {
  CaretDownIcon,
  MenuItemButton,
  MenuItemWrapper,
  MenusComponentWrapper,
  MenuSub2ItemWrapper,
  MenuSubItemButton,
  MenuSubItemIcon,
  MenuSubItemWrapper,
} from "./styled";

const MenuTree = ({ indexParent, setIndexParent, indexChild, setIndexChild, indexGrandChild, setIndexGrandChild, menus, setPath }) => {
  const mode = useSelector((s) => s.get("mode"));
  const menu = useSelector((s) => s.get("menu-slug"));
  const router = useSiteRouter();

  useEffect(() => {
    if (menu && menus) {
      let index = menus.findIndex((m) => m.slug === menu);
      if (index != -1) {
        setIndexParent(index);
        let item = menus[index];
        if (has(item, ["products"])) {
          setIndexGrandChild(undefined);
          setIndexChild(undefined);
          setPath([index]);
        } else {
          setIndexGrandChild(undefined);
          setIndexChild(0);
          setPath([index, "items", 0]);
        }
      }
    }
  }, [menu, menus]);

  return (
    <MenusComponentWrapper>
      {map(menus, (item, index) => (
        <MenuItemWrapper key={index}>
          <MenuItemButton
            onClick={() => {
              if (index == indexParent) {
                setIndexChild(undefined);
                setIndexParent(undefined);
              } else {
                setIndexParent(index);
                if (mode != DEVELOPMENT_MODE) {
                  router.push(`/our-menu/${item.slug}`, undefined, { shallow: true });
                }
              }
              if (has(item, ["products"])) {
                setIndexGrandChild(undefined);
                setIndexChild(undefined);
                setPath([index]);
              } else {
                setIndexGrandChild(undefined);
                setIndexChild(0);
                setPath([index, "items", 0]);
              }
            }}
          >
            <h3>{item.name}</h3>
            {get(item, ["items", "length"]) > 0 && (
              <CaretDownIcon isOpen={indexParent == index}>
                <IconTriangleDown width={13} height={7} />
              </CaretDownIcon>
            )}
          </MenuItemButton>
          {indexParent == index && isArray(item.items) && (
            <MenuSubItemWrapper>
              {item.items.map((subItem, subIndex) => (
                <Fragment key={subIndex}>
                  <MenuSubItemButton
                    isOpen={indexChild === subIndex && !has(subItem, ["items"])}
                    onClick={() => {
                      if (subIndex == indexChild) {
                        setIndexGrandChild(undefined);
                        setIndexChild(undefined);
                        setPath([indexParent]);
                        return;
                      }
                      setIndexChild(subIndex);
                      if (has(subItem, ["products"])) {
                        setIndexGrandChild(undefined);
                        setPath([indexParent, "items", subIndex]);
                      } else {
                        setIndexGrandChild(0);
                        setPath([indexParent, "items", subIndex, "items", 0]);
                      }
                    }}
                  >
                    <h4>{subItem.name}</h4>
                    {get(subItem, ["items", "length"]) > 0 && <MenuSubItemIcon isOpen={indexChild == subIndex} />}
                  </MenuSubItemButton>
                  {indexChild == subIndex && isArray(subItem.items) && (
                    <MenuSub2ItemWrapper>
                      {subItem.items.map((sub2Item, sub2Index) => (
                        <MenuSubItemButton
                          key={sub2Index}
                          isOpen={indexGrandChild === sub2Index}
                          onClick={() => {
                            setIndexGrandChild(sub2Index);
                            setPath([index, "items", subIndex, "items", sub2Index]);
                          }}
                        >
                          <h5>{sub2Item.name}</h5>
                        </MenuSubItemButton>
                      ))}
                    </MenuSub2ItemWrapper>
                  )}
                </Fragment>
              ))}
            </MenuSubItemWrapper>
          )}
        </MenuItemWrapper>
      ))}
    </MenusComponentWrapper>
  );
};

export default MenuTree;
