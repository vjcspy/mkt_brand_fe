import { isNil } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const TIMESCROLL = 300; //ms

const ScrollContainer = styled.div`
  display: flex;
  position: relative;
`;

const OnePageScrollHorizontal = ({
  children,
  pageOnChange,
  containerHeight = "100vh",
  minDeltaWheel = 5,
  minDeltaTouch = 50,
  pageIndex,
}) => {
  const [{ width }, scrollRef] = useIframeResize();
  const containerRef = useRef();
  const length = children?.length ?? 0;

  const [transition, setTransition] = useState(true);
  const [translateX, setTranslateX] = useState(0);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [movePos, setMovePos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({
    current: { x: 0, y: 0 },
    positive: false,
  });
  const [isScrolling, setIsScrolling] = useState(false);

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

  const onWheel = useCallback(
    (e) => {
      // if (Math.abs(e.deltaY) > minDeltaWheel && !isScrolling) {
      //   if (e.deltaY > 0) {
      //     setIsScrolling(true);
      //     setTranslateY((pre) => {
      //       return Math.max(pre - 1, -(length - 1));
      //     });
      //   } else {
      //     setIsScrolling(true);
      //     setTranslateY((pre) => {
      //       return Math.min(pre + 1, 0);
      //     });
      //   }
      // }
    },
    [length, isScrolling]
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
    pageOnChange?.(Math.abs(translateX));
  }, [pageOnChange, translateX]);

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
    if (isNil(pageIndex)) {
      return;
    }
    setTranslateX(-Math.abs(pageIndex));
  }, [pageIndex]);

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
        width: "100%",
        overflow: "hidden",
      }}
      tabIndex="0"
    >
      <ScrollContainer
        ref={containerRef}
        style={{
          width: `${length * 100}%`,
          height: "100%",
          transition: transition ? `transform ${TIMESCROLL}ms ease-out` : "none",
          transform: `translate3d(${((translateX + (movePos.x - startPos.x) / width) * 100) / length}%, 0px, 0px)`,
        }}
      >
        {children}
      </ScrollContainer>
    </div>
  );
};

export default OnePageScrollHorizontal;
