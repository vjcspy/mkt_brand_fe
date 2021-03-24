import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_HEIGHT_POPUP } from "../../constants";
import useAppHeight from "../../hooks/useAppHeight";

import IconTriangleLineLeft from "../icons/iconTriangleLineLeft";
import { WrapperPopupMobile, ContentPopup, WrapperClose, Content } from "./style";
const PopupMobile = ({ children, onBack, step, className, show }) => {
  const appHeight = useAppHeight();
  const refPopup = useRef();
  const headerHeight = useSelector((s) => s.get("headerHeight"));

  // const dispatch = useDispatch();

  // const setHeightPopup = () => dispatch({ type: SET_HEIGHT_POPUP, value: refPopup.current.clientHeight - 40 });

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (refPopup.current) {
  //       setHeightPopup();
  //     }
  //   }, 300);
  // }, [className]);

  return (
    <WrapperPopupMobile style={{ height: show ? appHeight - headerHeight : 0 }} className={className}>
      <WrapperClose onClick={onBack}>
        <IconTriangleLineLeft /> <h5>Back</h5>
      </WrapperClose>
      <ContentPopup>
        <Content ref={refPopup} style={{ transform: `translateX(${-step * 100}%)` }}>
          {children}
        </Content>
      </ContentPopup>
    </WrapperPopupMobile>
  );
};

export default PopupMobile;
