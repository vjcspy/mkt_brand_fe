import React, { useState } from "react";
import IconClose from "../icons/iconsClose";
import { Background, MarkerWrapper, PopupContent } from "./style";
import Portal from "../../development/containers/developmentDialog/portal";
const Popup = ({ show, onClose, children }) => {
  return show ? (
    <Background>
      <div>
        <MarkerWrapper className="showMarker" onClick={onClose} />
        <PopupContent className="showContent">
          <IconClose className="icon-close" onClick={onClose} />
          {children}
        </PopupContent>
      </div>
    </Background>
  ) : null;
};

export default Popup;
