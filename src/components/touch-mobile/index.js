import React, { useRef, useState, useEffect } from "react";

import IconRectangle from "../icons/iconRectangle";
import IconClose from "../icons/iconsClose";
import useAppHeight from "../../hooks/useAppHeight";
import { WrapperDrag, ContentDrag, IconDrag, IconCloseDrag, Content } from "./style";
let postionStart;
const DragMobile = ({ isShowDefault, children }) => {
  const refDrag = useRef();
  const refContent = useRef();
  const [statusTop, setStatusTop] = useState(false);
  const [height, setHeight] = useState(230);
  const appHeight = useAppHeight();

  const onMouseDown = (e) => {
    postionStart = e.clientY;
  };
  const onMouseMove = (e) => {
    if (postionStart) {
      if (postionStart < e.clientY) {
        setHeight(230);
        setStatusTop(false);
      } else if (postionStart > e.clientY) {
        setHeight("100%");
      }
    }
  };
  const onMouseUp = (e) => {
    postionStart = undefined;
    if (height !== 230) {
      setStatusTop(true);
    }
  };

  const onTouchStart = (e) => {
    if (refContent.current.clientHeight < refContent.current.scrollHeight && height === "100%") {
      return;
    }
    postionStart = e.touches[0].clientY;
    document.body.style.setProperty("overflow-y", `hidden`);
  };

  const onTouchMove = (e) => {
    if (postionStart < e.touches[0].clientY + 50) {
      setHeight(230);
      setStatusTop(false);
    } else if (postionStart > e.touches[0].clientY - 50) {
      setHeight("100%");
    }
  };

  const onTouchEnd = (e) => {
    postionStart = undefined;
    if (height !== 230) {
      setStatusTop(true);
    } else if (height <= 230) {
      document.body.style.removeProperty("overflow-y");
    }
  };
  const onClose = () => {
    setHeight(230);
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

  const onScroll = (e) => {
    e.stopPropagation();
  };

  return (
    <WrapperDrag style={{ height }} ref={refDrag}>
      <ContentDrag
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        {/* {statusTop ? (
          <IconDrag>
            <IconClose className="close" onClick={onClose} />
          </IconDrag>
        ) : ( */}
        <IconDrag>
          <IconRectangle />
        </IconDrag>
        {/* )} */}

        <Content onScroll={onScroll} ref={refContent} className={`${statusTop ? "content show" : "content"}`}>
          {children}
        </Content>
      </ContentDrag>
    </WrapperDrag>
  );
};

export default DragMobile;
