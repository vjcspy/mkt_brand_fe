import React, { useCallback, useEffect, useRef, useState } from "react";

const KEY_UP = 38;
const KEY_DOWN = 40;
const DISABLED_CLASS_NAME = "rps-scroll--disabled";
const TIMESCROLL = 300; //ms

const OnePageScroll = ({
  children,
  pageOnChange,
  containerHeight = "100vh",
  containerWidth = "100vw",
  minDeltaWheel = 5,
  minDeltaTouch = 50,
}) => {
  const scrollRef = useRef();
  const containerRef = useRef();
  const length = children.length;

  const [transition, setTransition] = useState(true);
  const [translateY, setTranslateY] = useState(0);
  const [startPos, setStartPos] = useState(0);
  const [movePos, setMovePos] = useState(0);
  const [delta, setDelta] = useState({
    current: 0,
    positive: false,
  });
  const [isScrolling, setIsScrolling] = useState(false);

  const onTouchStart = useCallback((event) => {
    const Y = event.touches[0].pageY;
    setStartPos(Y);
    setMovePos(Y);
    setTransition(false);
    setDelta({
      start: Y,
      current: Y,
      positive: undefined,
    });
  }, []);

  const onTouchMove = useCallback((event) => {
    const Y = event.touches[0].pageY;
    setMovePos(Y);
    setDelta(({ current, start }) => {
      return {
        start: start,
        current: Y,
        next: Y < start,
        positive: Math.abs(start - Y) <= minDeltaTouch ? undefined : current > Y,
      };
    });
  }, []);

  const onTouchEnd = useCallback(() => {
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
    setMovePos(0);
    setStartPos(0);
  }, [delta]);

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

  const keyPress = useCallback(
    (event) => {
      if (event.keyCode === KEY_DOWN) {
        setTranslateY((pre) => {
          return Math.max(pre - 1, -(length - 1));
        });
      }
      if (event.keyCode === KEY_UP) {
        setTranslateY((pre) => {
          return Math.min(pre + 1, 0);
        });
      }
    },
    [length]
  );

  useEffect(() => {
    pageOnChange?.(Math.abs(translateY));
    if (Math.abs(translateY) < length - 1) {
      let win = window.frames[0]?.window ?? window;
      win.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
      win.document.body.classList.add(DISABLED_CLASS_NAME);
      win.document.documentElement.classList.add(DISABLED_CLASS_NAME);
    } else {
      let win = window.frames[0]?.window ?? window;
      win.document.body.classList.remove(DISABLED_CLASS_NAME);
      win.document.documentElement.classList.remove(DISABLED_CLASS_NAME);
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

  return (
    <div
      ref={scrollRef}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onKeyDown={keyPress}
      style={{
        height: containerHeight || 0,
        width: containerWidth,
        overflow: "hidden",
      }}
      tabIndex="0"
    >
      <div
        ref={containerRef}
        style={{
          height: "100%",
          transform: `translate3d(0px, ${(translateY + (movePos - startPos) / containerHeight) * 100}%, 0px)`,
          transition: transition ? `transform ${TIMESCROLL}ms ease-out` : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default OnePageScroll;
