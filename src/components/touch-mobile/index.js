import React, { useRef, useState, useEffect } from "react";

import IconRectangle from "../icons/iconRectangle";
import IconClose from "../icons/iconsClose";
import { WrapperDrag, ContentDrag, IconDrag, IconCloseDrag, Content } from "./style";
const DragMobile = ({ isShowDefault, children }) => {
  const refDrag = useRef();
  const [statusTop, setStatusTop] = useState(false);
  const [height, setHeight] = useState(300);

  const onTouchStart = () => {};
  const onTouchMove = (e) => {
    setHeight(window.innerHeight - e.touches[0].clientY);
  };
  const onTouchEnd = () => {
    setStatusTop(true);
  };
  const onClose = () => {
    setStatusTop(false);
    setHeight(300);
  };
  const onOpen = () => {
    setStatusTop(true);
    setHeight("calc(100% - 114px)");
  };

  // mac dinh se show neu click xem uu dai o home page
  useEffect(() => {
    if (isShowDefault) {
      onOpen();
    }
  }, [isShowDefault]);
  return (
    <WrapperDrag style={{ height: height }}>
      <ContentDrag ref={refDrag}>
        <IconDrag>
          {statusTop ? (
            <IconClose className="close" onClick={onClose} />
          ) : (
            <IconRectangle onClick={onOpen} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={(e) => onTouchMove(e)} />
          )}
        </IconDrag>

        <Content className={`${statusTop ? "content show" : "content"}`}>{children}</Content>
      </ContentDrag>
    </WrapperDrag>
  );
};

export default DragMobile;
