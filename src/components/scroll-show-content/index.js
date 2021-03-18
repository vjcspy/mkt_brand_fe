import React, { useState, useRef, useEffect, useCallback } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import IconTriangleLineDown from "../icons/iconTriangleLineDown";
import { WrapperScroll, HiddenContent, Content, WrapperContent } from "./style";
import { useSelector } from "react-redux";

const ScrollShowContent = ({ children, ...rest }) => {
  const refScroll = useRef();
  const parentScroll = useRef();
  const [isBottom, setIsBottom] = useState(true);
  const size = useWindowResize();
  const heightPopup = useSelector((state) => state.get("heightPopup"));
  const [maxHeight, setMaxHeight] = useState();
  const checkIsBottom = useCallback(() => {
    const scrollHeight = parentScroll.current?.scrollHeight;
    const scroolTop = parentScroll.current?.scrollTop;
    const clientHeight = parentScroll.current?.clientHeight;
    if (scroolTop + 2 >= scrollHeight - clientHeight - 10) {
      return false;
    } else {
      return true;
    }
  }, []);

  const onScroll = useCallback((e) => {
    setIsBottom(checkIsBottom());
  }, []);

  useEffect(() => {
    document.body.style.setProperty("overflow-y", `hidden`);
    document.body.style.setProperty("height", `100vh`);
    return () => {
      document.body.style.removeProperty("overflow-y");
      document.body.style.removeProperty("height");
    };
  }, []);

  useEffect(() => {
    parentScroll.current?.addEventListener("scroll", onScroll, { passive: true });
    return () => refScroll.current?.removeEventListener("scroll", onScroll, { passive: true });
  }, [onScroll]);

  useEffect(() => {
    setIsBottom(checkIsBottom());
  }, [size, children]);

  useEffect(() => {
    if (parentScroll.current) {
      setMaxHeight(heightPopup - parentScroll.current.offsetTop);
    }
  }, [heightPopup]);

  const onMoveBottom = useCallback(() => {
    refScroll.current.scrollTo({
      top: 1000,
      left: 100,
      behavior: "smooth",
    });
  }, []);
  return (
    <WrapperContent>
      <Content {...rest} ref={parentScroll} onScroll={onScroll}>
        <WrapperScroll>{children}</WrapperScroll>
        <HiddenContent className={`${isBottom ? "show" : ""}`} onClick={onMoveBottom}>
          <IconTriangleLineDown />
        </HiddenContent>
      </Content>
    </WrapperContent>
  );
};

export default ScrollShowContent;
