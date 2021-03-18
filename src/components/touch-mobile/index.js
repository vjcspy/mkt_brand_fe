import React, { useRef, useState, useEffect } from "react";

import IconRectangle from "../icons/iconRectangle";
import IconClose from "../icons/iconsClose";
import useAppHeight from "../../hooks/useAppHeight";
import { WrapperDrag, ContentDrag, IconDrag, IconCloseDrag, Content } from "./style";
let postionStart;
const DragMobile = ({ isShowDefault, children }) => {
  const refDrag = useRef();
  const [statusTop, setStatusTop] = useState(false);
  const [transition, setTransition] = useState(false);
  const [height, setHeight] = useState(260);
  const appHeight = useAppHeight();

  const onMouseDown = (e) => {
    postionStart = e.clientY;
    setTransition(false);
  };
  const onMouseMove = (e) => {
    if (postionStart) {
      setHeight(260 + postionStart - e.clientY);
    }
  };
  const onMouseUp = (e) => {
    postionStart = undefined;
    setStatusTop(true);
    setTransition(true);
  };

  const onTouchStart = (e) => {
    setTransition(false);
    document.body.style.setProperty("overflow-y", `hidden`);
  };

  const onTouchMove = (e) => {
    setHeight(appHeight - e.touches[0].clientY);
  };

  const onTouchEnd = () => {
    setStatusTop(true);
    setTransition(true);
  };
  const onClose = () => {
    setHeight(260);
    document.body.style.removeProperty("overflow-y");
    setTimeout(() => {
      setStatusTop(false);
    });
  };
  const onOpen = () => {
    setStatusTop(true);
    setHeight(appHeight);
  };

  useEffect(() => {
    if (isShowDefault) {
      onOpen();
    }
  }, [isShowDefault]);
  return (
    <WrapperDrag style={{ transition: transition ? "0.3s" : "unset", height }} ref={refDrag}>
      <ContentDrag>
        {statusTop ? (
          <IconDrag>
            <IconClose className="close" onClick={onClose} />
          </IconDrag>
        ) : (
          <IconDrag
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
          >
            <IconRectangle />
          </IconDrag>
        )}

        <Content className={`${statusTop ? "content show" : "content"}`}>{children}</Content>
      </ContentDrag>
    </WrapperDrag>
  );
};

export default DragMobile;
