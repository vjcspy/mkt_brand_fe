import _, { get, has, map } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { MenuItemButton, MenuTreeMobileWrapper } from "./styled";

const MenuTree = ({ tree, currentIndex, isHidden, onClick, top }) => {
  const [list, setList] = useState(tree);
  const ref = useRef();

  useEffect(() => {
    if (tree) {
      setList(tree);
    }
  }, [tree]);

  useEffect(() => {
    let child = ref.current?.children[currentIndex];
    if (child) {
      const offsetLeft = child.offsetLeft;
      const offsetWidth = child.offsetWidth;
      const scrollLeft = ref.current.scrollLeft;
      if (scrollLeft + ref.current.offsetWidth < offsetLeft + offsetWidth) {
        // if (offsetLeft + offsetWidth > ref.current.offsetWidth) {
        ref.current.scrollTo({
          top: 0,
          left: offsetLeft + offsetWidth - ref.current.offsetWidth,
          behavior: "smooth",
        });
      } else if (scrollLeft > offsetLeft) {
        ref.current.scrollTo({
          top: 0,
          left: offsetLeft,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  return (
    <MenuTreeMobileWrapper className={isHidden ? "hide" : ""} top={top} ref={ref}>
      {map(list, (item, index) => (
        <MenuItemButton
          key={index}
          isOpen={item.pageIndex === currentIndex}
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

const MenuTreeMobile = ({ tree, onClick, currentIndex, childrenIndex, top }) => {
  return (
    <>
      <MenuTree
        key={"current"}
        tree={tree}
        isHidden={has(tree, [currentIndex, "children"])}
        currentIndex={currentIndex}
        onClick={onClick}
        top={top}
      />
      <MenuTree
        key={"children"}
        tree={get(tree, [currentIndex, "children"])}
        isHidden={!has(tree, [currentIndex, "children"])}
        currentIndex={childrenIndex}
        onClick={onClick}
        top={top}
      />
    </>
  );
};

export default MenuTreeMobile;
