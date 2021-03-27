import React, { useState, useRef, useEffect, useCallback } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import IconTriangleLineDown from "../icons/iconTriangleLineDown";
import { WrapperScroll, HiddenContent, Content, WrapperContent } from "./style";
const ScrollShowContent = ({ children, ...rest }) => {
  const refScroll = useRef();
  const parentScroll = useRef();
  const [isBottom, setIsBottom] = useState(false);
  const checkIsBottom = useCallback(() => {
    const scrollHeight = parentScroll.current?.scrollHeight;
    const scroolTop = parentScroll.current?.scrollTop;
    const clientHeight = parentScroll.current?.clientHeight;
    if (scroolTop + 2 >= scrollHeight - clientHeight - 10) {
      return false;
    } else {
      return true;
    }
  }, [children]);

  const onScroll = useCallback((e) => {
    setIsBottom(checkIsBottom());
  }, []);

  // useEffect(() => {
  //   document.body.style.setProperty("overflow-y", `hidden`);
  //   document.body.style.setProperty("height", `100vh`);
  //   return () => {
  //     document.body.style.removeProperty("overflow-y");
  //     document.body.style.removeProperty("height");
  //   };
  // }, []);

  useEffect(() => {
    parentScroll.current?.addEventListener("scroll", onScroll, { passive: true });
    return () => refScroll.current?.removeEventListener("scroll", onScroll, { passive: true });
  }, [onScroll]);

  const onMoveBottom = useCallback(() => {
    refScroll.current.scrollTo({
      top: 1000,
      left: 100,
      behavior: "smooth",
    });
  }, []);

  return (
    <WrapperContent>
      <Content id="ItemScroll" {...rest} ref={parentScroll} onScroll={onScroll}>
        <WrapperScroll>{children}</WrapperScroll>
        <HiddenContent className={`${isBottom ? "show option" : "option"}`} onClick={onMoveBottom}>
          <IconTriangleLineDown />
        </HiddenContent>
      </Content>
    </WrapperContent>
  );
};

export default ScrollShowContent;
