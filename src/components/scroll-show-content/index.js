import React, { useState, useRef, useEffect, useCallback } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import IconTriangleLineDown from "../icons/iconTriangleLineDown";
import { WrapperScroll, HiddenContent, Content } from "./style";
import { useSelector } from "react-redux";

const ScrollShowContent = ({ children, ...rest }) => {
  const refScroll = useRef();
  const parentScroll = useRef();
  const [isBottom, setIsBottom] = useState(true);
  const size = useWindowResize();
  const heightPopup = useSelector((state) => state.get("heightPopup"));
  const [maxHeight, setMaxHeight] = useState();

  const checkIsBottom = useCallback(() => {
    const scrollHeight = refScroll.current?.scrollHeight;
    const scroolTop = refScroll.current?.scrollTop;
    const clientHeight = refScroll.current?.clientHeight;
    if (scroolTop + 2 >= scrollHeight - clientHeight) {
      return false;
    } else {
      return true;
    }
  }, []);

  const onScroll = useCallback(() => {
    setIsBottom(checkIsBottom());
  }, []);

  useEffect(() => {
    refScroll.current?.addEventListener("scroll", onScroll, { passive: true });
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
    <Content ref={parentScroll}>
      <WrapperScroll maxHeight={Math.abs(maxHeight)} {...rest} ref={refScroll}>
        {children}
      </WrapperScroll>
      <HiddenContent className={`${isBottom ? "show" : ""}`} onClick={onMoveBottom}>
        <IconTriangleLineDown />
      </HiddenContent>
    </Content>
  );
};

export default ScrollShowContent;
