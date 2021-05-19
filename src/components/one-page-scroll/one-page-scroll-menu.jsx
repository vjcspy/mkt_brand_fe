import { get, isNil } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useRefCallback from "../../hooks/useRefCallback";

const KEY_UP = 38;
const KEY_DOWN = 40;
const DISABLED_CLASS_NAME = "rps-scroll--disabled";
const TIMESCROLL = 200; //ms

const OnePageScrollMenu = ({
  children,
  pageOnChange,
  containerHeight = "var(--app-height)",
  containerWidth = "100vw",
  itemHeight,
  minDeltaWheel = 5,
  minDeltaTouch = 50,
  customPageNumber,
  scrollToFooter,
}) => {
  const scrollRef = useRef();
  const containerRef = useRef();
  const length = children?.length ?? 0;
  const [transition, setTransition] = useState(true);
  const [translateX, setTranslateX] = useState(customPageNumber ? -customPageNumber : 0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [movePos, setMovePos] = useState({ x: 0, y: 0 });

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  const [delta, setDelta] = useState({
    current: { x: 0, y: 0 },
    positive: false,
  });
  useEffect(() => {
    if (!isNil(customPageNumber) && customPageNumber != -translateX) {
      setTranslateX(customPageNumber);
    }
  }, [customPageNumber]);
  // const onTouchStart = useRefCallback((event) => {
  //   const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);
  //
  //   let startY = event.touches[0].pageY;
  //   let startX = event.touches[0].pageX;
  //   let endY, endX;
  //
  //   const onTouchMove = (event) => {
  //     endY = event.touches[0].pageY;
  //     endX = event.touches[0].pageX;
  //   };
  //
  //   const onTouchEnd = () => {
  //     if (Math.abs(startY - endY) > Math.abs(startX - endX)) {
  //       setTransition(true);
  //       if (startY > endY) {
  //         // cong
  //         if (translateX === length - 1) {
  //           scrollToFooter();
  //         }
  //         setTranslateX((pre) => {
  //           if (pre === length - 1) {
  //             return pre;
  //           }
  //           return pre + 1;
  //         });
  //       } else {
  //         //tru
  //         setTranslateX((pre) => Math.max(pre - 1, 0));
  //       }
  //       win.document.removeEventListener("touchend", onTouchEnd);
  //       win.document.removeEventListener("touchmove", onTouchMove);
  //     }
  //   };
  //
  //   win.document.addEventListener("touchend", onTouchEnd);
  //   win.document.addEventListener("touchmove", onTouchMove);
  // });

  // const onWheel = useRefCallback((e) => {
  //   if (Math.abs(e.deltaY) > minDeltaWheel && !isScrolling) {
  //     if (e.deltaY > 0) {
  //       setIsScrolling(true);
  //       // if (translateX === length - 1) {
  //       //   scrollToFooter();
  //       // }
  //       setTranslateX((pre) => {
  //         if (pre === length - 1) {
  //           return pre;
  //         }
  //         return pre + 1;
  //       });
  //     } else {
  //       setIsScrolling(true);
  //       setTranslateX((pre) => Math.max(pre - 1, 0));
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   pageOnChange?.(Math.abs(translateX));
  //   if (Math.abs(translateX) < length - 1) {
  //     const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);
  //     win.scrollTo({
  //       left: 0,
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //     // win.document.body.classList.add(DISABLED_CLASS_NAME);
  //     // win.document.documentElement.classList.add(DISABLED_CLASS_NAME);
  //   } else {
  //     // const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);
  //     // win.document.body.classList.remove(DISABLED_CLASS_NAME);
  //     // win.document.documentElement.classList.remove(DISABLED_CLASS_NAME);
  //   }
  // }, [pageOnChange, translateX]);

  const onTouchStart = useCallback((event) => {
    const X = event.touches[0].pageX;
    const Y = event.touches[0].pageY;
    setStartPos({ x: X, y: Y });
    setMovePos({ x: X, y: Y });
    setTransition(false);
    setDelta({
      start: { x: X, y: Y },
      current: { x: X, y: Y },
      positive: undefined,
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    setTransition(true);
    if (typeof delta.positive !== "undefined") {
      if (delta.positive && delta.next) {
        setTranslateX((pre = 0) => {
          return Math.max(pre - 1, -(length - 1));
        });
      } else if (!delta.positive && !delta.next) {
        setTranslateX((pre = 0) => {
          return Math.min(pre + 1, 0);
        });
      }
    }
    setMovePos({ x: 0, y: 0 });
    setStartPos({ x: 0, y: 0 });
  }, [delta]);

  const onTouchMove = useCallback(
      (event) => {
        const X = event.touches[0].pageX;
        const Y = event.touches[0].pageY;
        if (Math.abs(startPos.y - Y) > Math.abs(startPos.x - X)) {
          setMovePos(startPos);
          setTransition(true);
        } else {
          setTransition(false);
          setMovePos({ x: X, y: Y });
        }
        setDelta(({ current, start }) => ({
          start: start,
          current: { x: X, y: Y },
          next: X < start.x,
          positive: Math.abs(start.x - X) <= minDeltaTouch ? undefined : current.x > X,
        }));
      },
      [startPos]
  );

  const keyPress = useCallback(
      (event) => {
        if (event.keyCode === KEY_RIGHT) {
          setTranslateX((pre) => {
            return Math.max(pre - 1, -(length - 1));
          });
        }
        if (event.keyCode === KEY_LEFT) {
          setTranslateX((pre) => {
            return Math.min(pre + 1, 0);
          });
        }
      },
      [length]
  );

  useEffect(() => {
    const listener = () => {
      setWidth(scrollRef.current?.offsetWidth);
    };
    listener();
    window.addEventListener("resize", listener, { passive: true });
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  useEffect(() => {
    pageOnChange?.(Math.abs(translateX));
    if (!containerHeight) {
      let height = get(containerRef.current, ["children", Math.abs(translateX), "children", 0, "offsetHeight"]);
      if (height) {
        setHeight(height);
      }
    } else {
      let height = get(scrollRef.current, ["offsetHeight"]);
      if (height) {
        setHeight(height);
      }
    }
  }, [pageOnChange, translateX, containerHeight]);



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
    if (isNil(customPageNumber) || Math.abs(translateX) == customPageNumber) {
      return;
    }
    setTranslateX(-Math.abs(customPageNumber));
  }, [customPageNumber]);

  // useEffect(() => {
  //   var timeout;
  //   if (isScrolling) {
  //     timeout = setTimeout(() => {
  //       setIsScrolling(false);
  //     }, TIMESCROLL);
  //   }
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [isScrolling]);
  //
  // useEffect(() => {
  //   return () => {
  //     const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);
  //     win.document.body.classList.remove(DISABLED_CLASS_NAME);
  //     win.document.documentElement.classList.remove(DISABLED_CLASS_NAME);
  //   };
  // }, []);

  return (
    <div
      // ref={scrollRef}
      // onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onKeyDown={keyPress}
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
          height: itemHeight,
          transition: transition ? `transform ${TIMESCROLL}ms ease-out` : "none",
          transform: `translate3d( -${translateX * 100}%,0px, 0px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default OnePageScrollMenu;
