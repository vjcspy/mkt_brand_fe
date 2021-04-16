import React, { useState, useEffect, useMemo } from "react";
import { RenderHeader, Sections } from "../../sections";
import { MainContainer, MainWrapper } from "../../styles";
import { get } from "lodash";
import DynamicFooter from "../../sections/dynamic-footer";
import { useSelector } from "react-redux";
import OnePageScrollHome from "../../components/one-page-scroll/one-page-scroll-home";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import useRefCallback from "../../hooks/useRefCallback";
import NotificationProvider from "../../components/notification";
import AcceptCookie from "../../components/accept-cookie";
import useAppHeight from "../../hooks/useAppHeight";
const HomePageContainer = ({ siteCode, pageName, modifiedConfig, pageNameQueryRouter, ...rest }) => {
  pageName = pageNameQueryRouter ?? pageName;
  const header = get(modifiedConfig, ["header"]);
  const footer = get(modifiedConfig, ["footer"]);
  const sections = get(modifiedConfig, ["pages", pageName, "sections"]);
  const [show, setShow] = useState(true);
  const acceptCookie = useSelector((state) => state.get("acceptCookie"));
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ width, height }, ref] = useIframeResize();
  const [currentPage, setCurrentPage] = useState(0);

  const [isDisableTop, setIsDisableTop] = useState({
    parent: false,
  });
  const appHeight = useAppHeight();

  useEffect(() => {
    if (acceptCookie) {
      setShow(false);
    }
  }, [acceptCookie]);

  const handlePageChange = useRefCallback((index) => {
    setCurrentPage(index);
    if (index > 0) {
      setIsDisableTop(false);
    } else {
      setIsDisableTop(true);
    }
  }, []);

  const renderSection = useMemo(() => {
    let result =
      sections?.map((config, index) => {
        const Section = Sections[config?.name];
        if (Section) {
          return (
            <Section
              key={index}
              isDisableTop={isDisableTop} // for scroll banner (#parent)
              onDisableTop={(value) => setIsDisableTop(value)}
              {...rest}
              config={config}
              footer={footer}
            />
          );
        }
      }) ?? [];
    result.push(<DynamicFooter config={footer} />);
    return result;
  }, [modifiedConfig, sections, isDisableTop]);

  return (
    <>
      <RenderHeader pageName={pageName} config={header} menus={modifiedConfig?.menus} />
      <MainWrapper style={{ height: appHeight - headerHeight }} className="main-content">
        <OnePageScrollHome
          isDisableTop={!isDisableTop}
          pageOnChange={handlePageChange}
          customPageNumber={currentPage}
          containerHeight={height - headerHeight}
          widthParent={width}
          from="home"
        >
          {sections?.map((config, index) => {
            const Section = Sections[config?.name];
            if (Section) {
              return (
                <Section
                  key={index}
                  isDisableTop={isDisableTop} // for scroll banner (#parent)
                  onDisableTop={(value) => setIsDisableTop(value)}
                  {...rest}
                  config={config}
                />
              );
            }
          })}
          <DynamicFooter config={footer} />
        </OnePageScrollHome>
      </MainWrapper>
      {show && <AcceptCookie />}
      <NotificationProvider />
    </>
  );
};

export default HomePageContainer;
