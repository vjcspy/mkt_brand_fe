import { get, map } from "lodash";
import { stringifyUrl } from "query-string";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import IconTriangleDown from "../../components/icons/iconTriangleDown";
import useAppHeight from "../../hooks/useAppHeight";
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
  const router = useSiteRouter();
  const menu = router.query.category;
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const appHeight = useAppHeight();
  useEffect(() => {
    if (menu && menus) {
      let index = menus.findIndex((m) => m.url_key === menu);
      if (index != -1) {
        setIndexParent(index);
        let item = menus[index];
        if (get(item, ["products", "length"]) > 0) {
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

  const scrollTop = () => {
    document.body.scrollTop = 0
  }

  return (
    <MenusComponentWrapper style={{ height: `${appHeight - headerHeight - 40}px` }} className="sticky">
      <div style={{ height: "fit-content" }}>
        {map(menus, (item, index) => (
          <MenuItemWrapper key={index}>
            <MenuItemButton
              onClick={() => {
                scrollTop()
                if (index == indexParent) {
                  setIndexChild(undefined);
                  // setIndexParent(undefined);
                } else {
                  setIndexParent(index);
                  router.pushQuery(
                    stringifyUrl({
                      url: `/our-menu`,
                      query: { category: item.url_key },
                    }),
                    undefined,
                    {
                      shallow: true,
                    }
                  );
                }
                if (get(item, ["products", "length"]) > 0) {
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
              {get(item, ["products", "length"]) > 0 && (
                <CaretDownIcon isOpen={indexParent == index}>
                  <IconTriangleDown
                    color={`${indexParent == index ? "#F89520" : "currentColor"}`}
                    width={20}
                    height={20}
                  />
                </CaretDownIcon>
              )}
            </MenuItemButton>

            {indexParent == index && item.isBundle && (
              <MenuSubItemWrapper isOpen={true}>
                {map(item.products, (bundleProduct, subIndex) => {
                  const hasChild = get(bundleProduct, ["items", "length"]) > 0;
                  const type = get(bundleProduct, ["items", 0, "type"]);
                  const length = get(bundleProduct, ['items', 'length']);
                  const shouldShowChild = !(type == 'checkbox' && length === 1)
                  return (
                    <Fragment key={subIndex}>
                      <MenuSubItemButton
                        isOpen={indexChild === subIndex}
                        onClick={() => {
                          scrollTop()
                          if (subIndex == indexChild) {
                            setIndexGrandChild(undefined);
                            setIndexChild(undefined);
                            setPath([indexParent]);
                            return;
                          }
                          setIndexChild(subIndex);
                          setIndexGrandChild(0);
                          setPath([indexParent, "products", subIndex, "items", 0]);
                        }}
                      >
                        <h5 className={`${hasChild ? "sup-item-1 have-sup-menu " : " sup-item-1"}`}>
                          {bundleProduct.name}
                        </h5>
                        {hasChild && shouldShowChild && <MenuSubItemIcon isOpen={indexChild == subIndex} />}
                      </MenuSubItemButton>
                      {indexChild == subIndex && hasChild && shouldShowChild && (
                        <MenuSub2ItemWrapper>
                          {bundleProduct.items.map((option, optionIndex) => (
                            <MenuSubItemButton
                              key={optionIndex}
                              isOpen={indexGrandChild === optionIndex}
                              onClick={() => {
                                setIndexGrandChild(optionIndex);
                                setPath([index, "products", subIndex, "items", optionIndex]);
                              }}
                            >
                              <h5>{option.title}</h5>
                            </MenuSubItemButton>
                          ))}
                        </MenuSub2ItemWrapper>
                      )}
                    </Fragment>
                  );
                })}
              </MenuSubItemWrapper>
            )}



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
                        if (get(subItem, ["products", "length"]) > 0) {
                          setIndexGrandChild(undefined);
                          setPath([indexParent, "children", subIndex]);
                        } else {
                          setIndexGrandChild(0);
                          setPath([indexParent, "children", subIndex, "children", 0]);
                        }
                      }}
                    >
                      <h5
                        className={`${get(subItem, ["children", "length"]) > 0 ? "sup-item-1 have-sup-menu " : " sup-item-1"
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
      </div>

    </MenusComponentWrapper>
  );
};

export default MenuTree;
