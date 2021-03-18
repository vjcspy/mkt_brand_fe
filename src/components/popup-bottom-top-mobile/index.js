import React, { useState, useEffect, useRef } from "react";
import { SET_HEIGHT_POPUP } from "../../constants";
import IconClose from "../icons/iconsClose";
import { WrapperPopup, ContentPopup } from "./style";
import { useDispatch } from "react-redux";
import useAppHeight from "../../hooks/useAppHeight";
const PopupBottomToMobile = ({ show, onClose, children, ...rest }) => {
  const [showPopup, setShow] = useState();
  const refPopup = useRef();
  const dispatch = useDispatch();
  const appHeight = useAppHeight();

  const setHeightPopup = () => dispatch({ type: SET_HEIGHT_POPUP, value: refPopup.current.clientHeight - 40 });

  useEffect(() => {
    setTimeout(() => {
      if (refPopup.current && show) {
        setHeightPopup();
      }
    }, 300);
  }, [show]);
  useEffect(() => {
    if (showPopup) {
      document.body.style.setProperty("overflow-y", `hidden`);
    } else {
      document.body.style.removeProperty("overflow-y", "auto");
    }
    return () => {
      document.body.style.removeProperty(("overflow-y", "auto"));
    };
  }, [showPopup]);
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
      <ContentPopup ref={refPopup}>
        <IconClose onClick={onClosePopup} />
        {children}
      </ContentPopup>
    </WrapperPopup>
  );
};

export default PopupBottomToMobile;
