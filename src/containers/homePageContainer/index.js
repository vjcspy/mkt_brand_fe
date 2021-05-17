import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { RenderHeader, Sections } from "../../sections";
import { MainContainer, MainWrapper } from "../../styles";
import { get } from "lodash";
import DynamicFooter from "../../sections/dynamic-footer";
import { useDispatch, useSelector } from "react-redux";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import NotificationProvider from "../../components/notification";
import AcceptCookie from "../../components/accept-cookie";
import { SET_SHOW_MENU_HEADER } from "../../constants";

const HomePageContainer = ({ siteCode, pageName, modifiedConfig, pageNameQueryRouter, ...rest }) => {
  pageName = pageNameQueryRouter ?? pageName;
  const header = get(modifiedConfig, ["header"]);
  const footer = get(modifiedConfig, ["footer"]);
  const sections = get(modifiedConfig, ["pages", pageName, "sections"]);
  const [show, setShow] = useState(true);
  const acceptCookie = useSelector((state) => state.get("acceptCookie"));
  const headerHeight = useSelector((s) => s.get("headerHeight")) ?? 0;
  const [{ width, height }, ref] = useIframeResize();
  const footerRef = useRef();
  const [showFooter, setShowFooter] = useState(false);

  const dispatch = useDispatch();

  const setShowMenuHeader = useCallback((value) => {
    setShowFooter(!value);
    dispatch({ type: SET_SHOW_MENU_HEADER, value });
  }, []);

  const handleScrollToFooter = useCallback(() => {
    setShowMenuHeader(false);
  }, []);

  useEffect(() => {
    if (acceptCookie) {
      setShow(false);
    }
  }, [acceptCookie]);

  const mainHeight = useMemo(() => {
    if (showFooter && footerRef.current) {
      return Math.max(footerRef.current.offsetHeight, height - headerHeight);
    }
    return height - headerHeight;
  }, [showFooter, height, headerHeight]);

  useEffect(() => {
    const win = get(ref, ["current", "ownerDocument", "defaultView", "window"], window);
    const onScroll = () => {
      if (win.document.documentElement.scrollTop <= -20) {
        setShowMenuHeader(true);
      }
    };
    const onWheel = (e) => {
      if (e.wheelDelta > 0 && win.document.documentElement.scrollTop <= 0) {
        setShowMenuHeader(true);
      }
    };
    if (showFooter) {
      win.addEventListener("wheel", onWheel);
      win.addEventListener("scroll", onScroll);
    }
    return () => {
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("wheel", onWheel);
    };
  }, [showFooter]);

  const onTouchStart = useCallback(
    (event) => {
      if (!showFooter) {
        return;
      }
      const win = get(ref, ["current", "ownerDocument", "defaultView", "window"], window);

      let startY = event.touches[0].pageY;
      let startX = event.touches[0].pageX;
      let endY, endX;

      const onTouchMove = (event) => {
        endY = event.touches[0].pageY;
        endX = event.touches[0].pageX;
      };

      const onTouchEnd = () => {
        if (Math.abs(startY - endY) > Math.abs(startX - endX)) {
          if (startY < endY && win.document.documentElement.scrollTop <= 0) {
            setShowMenuHeader(true);
          }
          win.document.removeEventListener("touchend", onTouchEnd);
          win.document.removeEventListener("touchmove", onTouchMove);
        }
      };

      win.document.addEventListener("touchend", onTouchEnd);
      win.document.addEventListener("touchmove", onTouchMove);
    },
    [showFooter]
  );

  return (
    <MainContainer ref={ref} onTouchStart={onTouchStart}>
      <RenderHeader pageName={pageName} config={header} menus={modifiedConfig?.menus} />
      <MainWrapper
        style={{
          height: mainHeight,
          maxHeight: mainHeight,
          overflow: "hidden",
        }}
        className="main-content"
      >
        <div
          style={{
            transition: "all 0.3s ease-in-out",
            // transform: `translate3d(0px, ${showFooter ? -(height - headerHeight) : 0}px, 0px)`,
              transform: `translate3d(0px, 0px, 0px)`,
            width: "100%",
          }}
        >
          {useMemo(
            () =>
              sections?.map((config, index) => {
                const Section = Sections[config?.name];
                if (Section) {
                  return <Section key={index} scrollToFooter={handleScrollToFooter} {...rest} config={config}
                                  footer={footer} footerRef={footerRef} mainHeight={mainHeight}/>;
                }
              }),
            []
          )}
          {/*<DynamicFooter config={footer} ref={footerRef} mainHeight={mainHeight} />*/}
        </div>
      </MainWrapper>
      {show && <AcceptCookie />}
      <NotificationProvider />
    </MainContainer>
  );
};

export default HomePageContainer;
