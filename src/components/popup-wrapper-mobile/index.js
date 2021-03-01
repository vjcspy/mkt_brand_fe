import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_HEIGHT_POPUP } from "../../constants";

import IconTriangleLineLeft from "../icons/iconTriangleLineLeft";
import { WrapperPopupMobile, ContentPopup, WrapperClose, Content } from "./style";
const PopupMobile = ({ children, onBack, step, className }) => {
  const refPopup = useRef();
  const dispatch = useDispatch();

  const setHeightPopup = () => dispatch({ type: SET_HEIGHT_POPUP, value: refPopup.current.clientHeight - 40 });

  useEffect(() => {
    setTimeout(() => {
      if (refPopup.current) {
        setHeightPopup();
      }
    }, 300);
  }, [className]);

  return (
    <WrapperPopupMobile className={className}>
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
