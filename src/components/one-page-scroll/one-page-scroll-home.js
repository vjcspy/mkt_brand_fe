import { get, isNil } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useRefCallback from "../../hooks/useRefCallback";

const KEY_UP = 38;
const KEY_DOWN = 40;
const DISABLED_CLASS_NAME = "rps-scroll--disabled";
const TIMESCROLL = 200; //ms

const OnePageScrollHome = ({
  children,
  pageOnChange,
  containerHeight = "var(--app-height)",
  containerWidth = "100vw",
  minDeltaWheel = 5,
  minDeltaTouch = 50,
  customPageNumber,
  scrollToFooter,
  widthParent,
  from = "wwew",
  child,
}) => {
  const scrollRef = useRef();
  const containerRef = useRef();
  const length = children?.length ?? 0;
  const [transition, setTransition] = useState(true);
  const [translateY, setTranslateY] = useState(customPageNumber ? -customPageNumber : 0);
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    if (!isNil(customPageNumber) && customPageNumber != -translateY) {
      setTranslateY(customPageNumber);
    }
  }, [customPageNumber]);

  const onTouchStart = useCallback(
    (event) => {
      const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);

      let startY = event.touches[0].pageY;
      let startX = event.touches[0].pageX;
      let endY, endX;

      const onTouchMove = (event) => {
        endY = event.touches[0].pageY;
        endX = event.touches[0].pageX;
      };

      const onTouchEnd = () => {
        if (Math.abs(startY - endY) > Math.abs(startX - endX)) {
          setTransition(true);
          if (startY > endY) {
            // cong
            setTranslateY((pre) => {
              if (pre === length - 1) {
                scrollToFooter();
                return pre;
              }
              return pre + 1;
            });
          } else {
            //tru
            setTranslateY((pre) => Math.max(pre - 1, 0));
          }
          win.document.removeEventListener("touchend", onTouchEnd);
          win.document.removeEventListener("touchmove", onTouchMove);
        }
      };

      win.document.addEventListener("touchend", onTouchEnd);
      win.document.addEventListener("touchmove", onTouchMove);
    },
    [children]
  );

  const onWheel = useRefCallback((e) => {
    if (Math.abs(e.deltaY) > minDeltaWheel && !isScrolling) {
      if (e.deltaY > 0) {
        setIsScrolling(true);
        if (translateY === length - 1) {
          scrollToFooter();
        }
        setTranslateY((pre) => {
          if (pre === length - 1) {
            return pre;
          }
          return pre + 1;
        });
      } else {
        setIsScrolling(true);
        setTranslateY((pre) => Math.max(pre - 1, 0));
      }
    }
  }, []);

  useEffect(() => {
    pageOnChange?.(Math.abs(translateY));
    if (Math.abs(translateY) < length - 1) {
      const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);
      win.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
      // win.document.body.classList.add(DISABLED_CLASS_NAME);
      // win.document.documentElement.classList.add(DISABLED_CLASS_NAME);
    } else {
      // const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);
      // win.document.body.classList.remove(DISABLED_CLASS_NAME);
      // win.document.documentElement.classList.remove(DISABLED_CLASS_NAME);
    }
  }, [pageOnChange, translateY]);

  useEffect(() => {
    var timeout;
    if (isScrolling) {
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, TIMESCROLL);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isScrolling]);

  useEffect(() => {
    return () => {
      const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);
      win.document.body.classList.remove(DISABLED_CLASS_NAME);
      win.document.documentElement.classList.remove(DISABLED_CLASS_NAME);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      style={{
        height: containerHeight || 0,
        width: containerWidth,
        overflow: "hidden",
        outline: "none",
      }}
      tabIndex="0"
    >
      <div
        ref={containerRef}
        style={{
          height: "100%",
          transform: `translate3d(0px, -${translateY * 100}%, 0px)`,
          transition: transition ? `transform ${TIMESCROLL}ms ease-out` : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default OnePageScrollHome;
