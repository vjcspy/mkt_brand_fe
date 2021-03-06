import { get, isNil } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const KEY_UP = 38;
const KEY_DOWN = 40;
const DISABLED_CLASS_NAME = "rps-scroll--disabled";
const TIMESCROLL = 300; //ms

const OnePageScroll = ({
  children,
  pageOnChange,
  containerHeight = "var(--app-height)",
  containerWidth = "100vw",
  minDeltaWheel = 5,
  minDeltaTouch = 50,
  customPageNumber,
  from,
}) => {
  const scrollRef = useRef();
  const containerRef = useRef();
  const length = children?.length ?? 0;
  const [transition, setTransition] = useState(true);
  const [translateY, setTranslateY] = useState(customPageNumber ? -customPageNumber : 0);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [movePos, setMovePos] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (!isNil(customPageNumber) && customPageNumber != -translateY) {
      setTranslateY(-customPageNumber);
    }
  }, [customPageNumber]);

  const onTouchStart = useCallback((event) => {
    const win = get(scrollRef, ["current", "ownerDocument", "defaultView", "window"], window);

    const Y = event.touches[0].pageY;
    const X = event.touches[0].pageX;
    var startPos = {
      x: X,
      y: Y,
    };
    var movePos = {
      x: X,
      y: Y,
    };
    var delta = {
      start: { x: X, y: Y },
      current: { x: X, y: Y },
      positive: undefined,
    };

    setStartPos({ x: X, y: Y });
    setMovePos({ x: X, y: Y });
    setTransition(false);

    const onTouchMove = (event) => {
      const Y = event.touches[0].pageY;
      const X = event.touches[0].pageX;
      if (Math.abs(startPos.x - X) > Math.abs(startPos.y - Y)) {
        movePos = startPos;
        setMovePos(movePos);
        setTransition(true);
      } else {
        setTransition(false);
        movePos = { x: X, y: Y };
        setMovePos(movePos);
      }
      delta = {
        start: delta.start,
        current: { x: X, y: Y },
        next: Y < delta.start.y,
        positive: Math.abs(delta.start.y - Y) <= minDeltaTouch ? undefined : delta.current.y > Y,
      };
    };

    const onTouchEnd = () => {
      setTransition(true);
      if (typeof delta.positive !== "undefined") {
        if (delta.positive && delta.next) {
          setTranslateY((pre) => {
            return Math.max(pre - 1, -(length - 1));
          });
        } else if (!delta.positive && !delta.next) {
          setTranslateY((pre) => {
            return Math.min(pre + 1, 0);
          });
        }
      }
      setMovePos({ x: 0, y: 0 });
      setStartPos({ x: 0, y: 0 });

      win.document.removeEventListener("touchend", onTouchEnd);
      win.document.removeEventListener("touchmove", onTouchMove);
    };

    win.document.addEventListener("touchend", onTouchEnd);
    win.document.addEventListener("touchmove", onTouchMove);
  }, []);

  const onWheel = useCallback(
    (e) => {
      if (Math.abs(e.deltaY) > minDeltaWheel && !isScrolling) {
        if (e.deltaY > 0) {
          setIsScrolling(true);
          setTranslateY((pre) => {
            return Math.max(pre - 1, -(length - 1));
          });
        } else {
          setIsScrolling(true);
          setTranslateY((pre) => {
            return Math.min(pre + 1, 0);
          });
        }
      }
    },
    [length, isScrolling]
  );

  // const keyPress = useCallback(
  //   (event) => {
  //     if (event.keyCode === KEY_DOWN) {
  //       setTranslateY((pre) => {
  //         return Math.max(pre - 1, -(length - 1));
  //       });
  //     }
  //     if (event.keyCode === KEY_UP) {
  //       setTranslateY((pre) => {
  //         return Math.min(pre + 1, 0);
  //       });
  //     }
  //   },
  //   [length]
  // );

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

  const top = useMemo(() => {
    return -Math.abs(translateY) * containerHeight;
    if (children?.[Math.abs(translateY)] && containerRef.current) {
      return -containerRef.current?.children[Math.abs(translateY)]?.offsetTop;
    }
    return 0;
  }, [translateY]);

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
          transform: `translate3d(0px, ${top + (movePos.y - startPos.y)}px, 0px)`,
          transition: transition ? `transform ${TIMESCROLL}ms ease-out` : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default OnePageScroll;
