import { get, has, map } from "lodash";
import React, { useEffect, useState } from "react";
import { MenuItemButton, MenuTreeMobileWrapper } from "./styled";

const MenuTree = ({ tree, currentIndex, isHidden, onClick }) => {
  const [list, setList] = useState(tree);

  useEffect(() => {
    if (tree) {
      setList(tree);
    }
  }, [tree]);

  return (
    <MenuTreeMobileWrapper className={isHidden ? "hide" : ""}>
      {map(list, (item, index) => (
        <MenuItemButton
          key={index}
          isOpen={index === currentIndex}
          onClick={() => {
            onClick(item.pageIndex);
          }}
        >
          <h5>{item.name}</h5>
        </MenuItemButton>
      ))}
    </MenuTreeMobileWrapper>
  );
};

const MenuTreeMobile = ({ tree, onClick, currentIndex, childrenIndex }) => {
  return (
    <>
      <MenuTree
        key={"current"}
        tree={tree}
        isHidden={has(tree, [currentIndex, "children"])}
        currentIndex={currentIndex}
        onClick={onClick}
      />
      <MenuTree
        key={"children"}
        tree={get(tree, [currentIndex, "children"])}
        isHidden={!has(tree, [currentIndex, "children"])}
        currentIndex={childrenIndex}
        onClick={onClick}
      />
    </>
  );
};

export default MenuTreeMobile;
