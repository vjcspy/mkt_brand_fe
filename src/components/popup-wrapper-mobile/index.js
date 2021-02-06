import React, { useEffect } from "react";
import IconTriangleLineLeft from "../icons/iconTriangleLineLeft";
import { WrapperPopupMobile, ContentPopup, WrapperClose, Content } from "./style";
const PopupMobile = ({ children, onBack, step, className }) => {
  return (
    <WrapperPopupMobile className={className}>
      <WrapperClose onClick={onBack}>
        <IconTriangleLineLeft /> <h5>Back</h5>
      </WrapperClose>

      <ContentPopup>
        <Content className="okok" style={{ transform: `translateX(${-step * 100}%)` }}>
          {children}
        </Content>
      </ContentPopup>
    </WrapperPopupMobile>
  );
};

export default PopupMobile;
