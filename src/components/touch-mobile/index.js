import React, { useRef, useState, useEffect } from "react";

import IconRectangle from "../icons/iconRectangle";
import IconClose from "../icons/iconsClose";
import useAppHeight from "../../hooks/useAppHeight";
import { WrapperDrag, ContentDrag, IconDrag, IconCloseDrag, Content } from "./style";
let postionStart;
const DragMobile = ({ isShowDefault, children }) => {
  const refDrag = useRef();
  const [statusTop, setStatusTop] = useState(false);
  const [height, setHeight] = useState(260);
  const appHeight = useAppHeight();

  const onMouseDown = (e) => {
    postionStart = e.clientY;
  };
  const onMouseMove = (e) => {
    if (postionStart) {
      if (postionStart < e.clientY + 50) {
        setHeight(260);
        setStatusTop(false);
      } else if (postionStart > e.clientY - 50) {
        setHeight("100%");
      }
    }
  };
  const onMouseUp = (e) => {
    postionStart = undefined;
    if (height !== 260) {
      setStatusTop(true);
    }
  };

  const onTouchStart = (e) => {
    postionStart = e.touches[0].clientY;
    document.body.style.setProperty("overflow-y", `hidden`);
  };

  const onTouchMove = (e) => {
    if (postionStart < e.touches[0].clientY + 50) {
      setHeight(260);
      setStatusTop(false);
    } else if (postionStart > e.touches[0].clientY - 50) {
      setHeight("100%");
    }
  };

  const onTouchEnd = (e) => {
    postionStart = undefined;
    if (height !== 260) {
      setStatusTop(true);
    }
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
    <WrapperDrag style={{ height }} ref={refDrag}>
      <ContentDrag>
        {/* {statusTop ? (
          <IconDrag>
            <IconClose className="close" onClick={onClose} />
          </IconDrag>
        ) : ( */}
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
        {/* )} */}

        <Content className={`${statusTop ? "content show" : "content"}`}>{children}</Content>
      </ContentDrag>
    </WrapperDrag>
  );
};

export default DragMobile;
