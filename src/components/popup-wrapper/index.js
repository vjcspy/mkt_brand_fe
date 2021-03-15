import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_HEIGHT_POPUP } from "../../constants";
import IconClose from "../icons/iconsClose";
import { Background, MarkerWrapper, PopupContent } from "./style";
const Popup = ({ show, onClose, children, ...rest }) => {
  const refPopup = useRef();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (refPopup.current) {
  //     setTimeout(() => {
  //       const height = refPopup.current?.clientHeight;
  //       dispatch({ type: SET_HEIGHT_POPUP, name: "popupWrapper", value: height - 80 });
  //     }, 100);
  //   }
  // }, [children]);

  return show ? (
    <Background>
      <div>
        <MarkerWrapper className="showMarker" onClick={onClose} />
        <PopupContent {...rest} ref={refPopup} className="showContent">
          <IconClose className="icon-close" onClick={onClose} />
          {children}
        </PopupContent>
      </div>
    </Background>
  ) : null;
};

export default Popup;
