import { get, map } from "lodash";
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
  NameParentMenu,
} from "./styled";

const MenuTree = ({
  indexParent,
  setIndexParent,
  indexChild,
  setIndexChild,
  indexGrandChild,
  setIndexGrandChild,
  menus,
  setPath,
}) => {
  const mode = useSelector((s) => s.get("mode"));
  const router = useSiteRouter();
  const {
    query: { menu },
  } = router;

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

  return (
    <MenusComponentWrapper className="sticky">
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
            }}
          >
            <NameParentMenu isOpen={indexParent == index}>{item.name}</NameParentMenu>
            {get(item, ["children", "length"]) > 0 && (
              <CaretDownIcon isOpen={indexParent == index}>
                <IconTriangleDown
                  color={`${indexParent == index ? "#F89520" : "currentColor"}`}
                  width={20}
                  height={20}
                />
              </CaretDownIcon>
            )}
          </MenuItemButton>
          {indexParent == index && get(item, ["children", "length"]) > 0 && (
            <MenuSubItemWrapper isOpen={true}>
              {map(item.children, (subItem, subIndex) => (
                <Fragment key={subIndex}>
                  <MenuSubItemButton
                    isOpen={indexChild === subIndex}
                    onClick={() => {
                      if (subIndex == indexChild) {
                        setIndexGrandChild(undefined);
                        setIndexChild(undefined);
                        setPath([indexParent]);
                        return;
                      }
                      setIndexChild(subIndex);
                      if (get(subItem, ["products", "items", "length"]) > 0) {
                        setIndexGrandChild(undefined);
                        setPath([indexParent, "children", subIndex]);
                      } else {
                        setIndexGrandChild(0);
                        setPath([indexParent, "children", subIndex, "children", 0]);
                      }
                    }}
                  >
                    <h5
                      className={`${
                        get(subItem, ["children", "length"]) > 0 ? "sup-item-1 have-sup-menu " : " sup-item-1"
                      }`}
                    >
                      {subItem.name}
                    </h5>
                    {get(subItem, ["children", "length"]) > 0 && <MenuSubItemIcon isOpen={indexChild == subIndex} />}
                  </MenuSubItemButton>
                  {indexChild == subIndex && get(subItem, ["children", "length"]) > 0 && (
                    <MenuSub2ItemWrapper>
                      {subItem.children.map((sub2Item, sub2Index) => (
                        <MenuSubItemButton
                          key={sub2Index}
                          isOpen={indexGrandChild === sub2Index}
                          onClick={() => {
                            setIndexGrandChild(sub2Index);
                            setPath([index, "children", subIndex, "children", sub2Index]);
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
