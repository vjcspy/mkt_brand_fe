import React, { useState, useEffect } from "react";
import IconClose from "../icons/iconsClose";
import { WrapperPopup, ContentPopup } from "./style";
const PopupBottomToMobile = ({ show, onClose, children, ...rest }) => {
  const [showPopup, setShow] = useState();

  const onClosePopup = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  useEffect(() => {
    setTimeout(() => {
      setShow(show);
    });
  }, []);
  return (
    <WrapperPopup className={`${showPopup ? "show" : ""}`} {...rest}>
      <ContentPopup>
        <IconClose onClick={onClosePopup} />
        {children}
      </ContentPopup>
    </WrapperPopup>
  );
};

export default PopupBottomToMobile;
